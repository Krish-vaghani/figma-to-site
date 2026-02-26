/**
 * Order API for Razorpay flow.
 * Base URL: same as auth/product API (api.pursolina.com). Override with VITE_ORDER_API_URL if needed.
 */

const AUTH_TOKEN_KEY = "auth_token";
const ORDER_BASE_URL =
  import.meta.env.VITE_ORDER_API_URL ?? "https://api.pursolina.com/api/v1";

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
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
    throw new Error(data?.message ?? "Payment verification failed");
  }
  return data;
}
