/**
 * Order API for Razorpay flow.
 * Base URL: same as auth/product API (api.pursolina.com). Override with VITE_ORDER_API_URL if needed.
 */

import type { CartItem } from "@/contexts/CartContext";
import {
  type DeliveryAddress,
  type Order,
  type OrderStatus,
  buildTrackingTimelineFromApi,
} from "@/contexts/OrderContext";
import { heroProduct } from "@/lib/assetUrls";
import { getCachedProductImage } from "@/lib/productImageCache";
import { writeOrdersListCache } from "@/lib/ordersFetchCache";
import { clearAuthAndRedirect } from "@/store/baseQueryWithAuthLogout";

const AUTH_TOKEN_KEY = "auth_token";
const ORDER_BASE_URL =
  import.meta.env.VITE_ORDER_API_URL ?? "https://api.pursolina.com/api/v1";

/** Max wait for GET /order/list and GET /order/:id (ms). Override with VITE_ORDER_GET_TIMEOUT_MS. */
const ORDER_GET_TIMEOUT_MS = Number(import.meta.env.VITE_ORDER_GET_TIMEOUT_MS) || 5000;

function isAbortError(e: unknown): boolean {
  return (
    (typeof DOMException !== "undefined" && e instanceof DOMException && e.name === "AbortError") ||
    (e instanceof Error && e.name === "AbortError")
  );
}

/** Abortable GET so slow networks do not sit on a 15s+ loader. */
async function orderJsonGet(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), ORDER_GET_TIMEOUT_MS);
  try {
    return await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(),
      signal: controller.signal,
    });
  } catch (e) {
    if (isAbortError(e)) {
      throw new Error("Request timed out. Check your connection and try again.");
    }
    throw e;
  } finally {
    window.clearTimeout(timer);
  }
}

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

/** Resolve image for order line items (list/detail may omit image). */
function orderLineImage(productId: string, image: string | null | undefined): string {
  const trimmed = typeof image === "string" ? image.trim() : "";
  let candidate = trimmed;
  if (!candidate) {
    const c = getCachedProductImage(productId);
    if (c) candidate = c.trim();
  }
  if (!candidate) return heroProduct;
  if (/^https?:\/\//i.test(candidate)) return candidate;
  const apiBase =
    import.meta.env.VITE_IMAGE_BASE_URL ??
    import.meta.env.VITE_ORDER_API_URL ??
    "https://api.pursolina.com/api/v1";
  let origin = "https://api.pursolina.com";
  try {
    origin = new URL(apiBase).origin;
  } catch {
    /* ignore */
  }
  return candidate.startsWith("/") ? `${origin}${candidate}` : `${origin}/${candidate}`;
}

export interface ApiOrderDeliverTo {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  landmark?: string;
}

export interface ApiOrderLineList {
  product: string;
  productName: string;
  quantity: number;
  pricePerItem: number;
  originalPrice: number;
  totalForItem: number;
}

export interface ApiOrderProductEmbed {
  _id: string;
  name: string;
  slug?: string;
  price: number;
  salePrice?: number | null;
  image: string | null;
}

export interface ApiOrderLineDetail {
  product: string | ApiOrderProductEmbed;
  productName: string;
  quantity: number;
  pricePerItem: number;
  originalPrice: number;
  totalForItem: number;
}

export interface ApiOrderListItem {
  _id: string;
  orderId: string;
  user: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  shiprocketOrderId?: string | null;
  shiprocketShipmentId?: string | null;
  awbCode?: string | null;
  trackingUrl?: string | null;
  placedAt: string;
  confirmedAt: string | null;
  shippedAt: string | null;
  outForDeliveryAt: string | null;
  deliveredAt: string | null;
  estimatedDeliveryDate: string;
  deliverTo: ApiOrderDeliverTo;
  items: ApiOrderLineList[];
  subtotal: number;
  shippingCharge: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiOrderDetail extends Omit<ApiOrderListItem, "items"> {
  items: ApiOrderLineDetail[];
}

export interface OrderListResponse {
  message: string;
  data: ApiOrderListItem[];
  total: number;
  page: number;
  limit: number;
}

export interface OrderDetailResponse {
  message: string;
  data: ApiOrderDetail;
}

/** Map GET /order/:id response to app Order (for OrderDetail UI). */
export function mapApiOrderDetailToOrder(data: ApiOrderDetail): Order {
  const items: CartItem[] = data.items.map((line) => {
    const p = typeof line.product === "object" && line.product !== null ? line.product : null;
    const pid = p?._id ?? String(line.product);
    return {
      id: pid,
      name: line.productName,
      price: line.pricePerItem,
      originalPrice: line.originalPrice,
      image: orderLineImage(pid, p?.image ?? null),
      color: "#888888",
      quantity: line.quantity,
    };
  });

  const d = data.deliverTo;
  const address: DeliveryAddress = {
    fullName: d.fullName,
    phone: d.phone,
    email: d.email,
    addressLine1: d.addressLine1,
    addressLine2: d.addressLine2 ?? "",
    city: d.city,
    state: d.state,
    pincode: d.pincode,
    landmark: d.landmark ?? "",
  };

  const status = (data.status as OrderStatus) || "placed";
  const paymentMethod: "cod" | "online" = data.paymentMethod === "cod" ? "cod" : "online";

  return {
    id: data.orderId,
    items,
    address,
    total: data.total,
    paymentMethod,
    status,
    placedAt: data.placedAt,
    estimatedDelivery: data.estimatedDeliveryDate ?? addDays(data.placedAt, 5),
    trackingEvents:
      status === "cancelled"
        ? []
        : buildTrackingTimelineFromApi({
            status: data.status,
            placedAt: data.placedAt,
            confirmedAt: data.confirmedAt,
            shippedAt: data.shippedAt,
            outForDeliveryAt: data.outForDeliveryAt,
            deliveredAt: data.deliveredAt,
            estimatedDeliveryDate: data.estimatedDeliveryDate,
            paymentStatus: data.paymentStatus,
          }),
    subtotal: data.subtotal,
    shippingCharge: data.shippingCharge,
    trackingUrl: data.trackingUrl,
    awbCode: data.awbCode,
  };
}

const ordersListInFlight = new Map<string, Promise<OrderListResponse>>();
const orderDetailInFlight = new Map<string, Promise<ApiOrderDetail>>();

export async function getOrdersList(page = 1, limit = 10): Promise<OrderListResponse> {
  const key = `${page}_${limit}`;
  const existing = ordersListInFlight.get(key);
  if (existing) return existing;

  const p = (async () => {
    try {
      const q = new URLSearchParams({ page: String(page), limit: String(limit) });
      const res = await orderJsonGet(`${ORDER_BASE_URL}/order/list?${q}`);
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) clearAuthAndRedirect();
        throw new Error(data?.message ?? "Failed to load orders");
      }
      return data as OrderListResponse;
    } finally {
      ordersListInFlight.delete(key);
    }
  })();

  ordersListInFlight.set(key, p);
  return p;
}

/**
 * Warm session cache after login / on idle so Orders opens without waiting on the network.
 */
export function prefetchOrdersList(page = 1, limit = 10): void {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(AUTH_TOKEN_KEY)) return;
  getOrdersList(page, limit)
    .then((res) => writeOrdersListCache(res.data ?? []))
    .catch(() => {
      /* ignore — Orders page will retry */
    });
}

export async function getOrderById(orderMongoId: string): Promise<ApiOrderDetail> {
  const existing = orderDetailInFlight.get(orderMongoId);
  if (existing) return existing;

  const p = (async () => {
    try {
      const res = await orderJsonGet(`${ORDER_BASE_URL}/order/${encodeURIComponent(orderMongoId)}`);
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) clearAuthAndRedirect();
        throw new Error(typeof data?.message === "string" ? data.message : "Failed to load order");
      }
      if (!data?.data) throw new Error("Invalid order response");
      return data.data as ApiOrderDetail;
    } finally {
      orderDetailInFlight.delete(orderMongoId);
    }
  })();

  orderDetailInFlight.set(orderMongoId, p);
  return p;
}

export interface CreateRazorpayOrderRequest {
  addressId: string;
  items: { productId: string; quantity: number }[];
}

export interface CreateRazorpayOrderResponse {
  message: string;
  data: {
    order: {
      _id: string;
      orderId: string;
      total: number;
      subtotal?: number;
      shipping?: number;
      paymentMethod: string;
      paymentStatus: string;
      razorpayOrderId?: string | null;
      [key: string]: unknown;
    };
    razorpayOrderId: string;
    key_id: string;
    amount: number;
    currency: string;
  };
}

export interface VerifyRazorpayPaymentRequest {
  orderId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyRazorpayPaymentResponse {
  message: string;
  data?: { order: unknown };
}

export async function createRazorpayOrder(
  body: CreateRazorpayOrderRequest
): Promise<CreateRazorpayOrderResponse> {
  const res = await fetch(`${ORDER_BASE_URL}/order/create-razorpay-order`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) clearAuthAndRedirect();
    throw new Error(data?.message ?? "Failed to create order");
  }
  return data;
}

export async function verifyRazorpayPayment(
  body: VerifyRazorpayPaymentRequest
): Promise<VerifyRazorpayPaymentResponse> {
  const res = await fetch(`${ORDER_BASE_URL}/order/verify-razorpay-payment`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) clearAuthAndRedirect();
    throw new Error(data?.message ?? "Payment verification failed");
  }
  return data;
}
