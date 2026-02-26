import "dotenv/config";
import express from "express";
import cors from "cors";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";

const app = express();
const PORT = process.env.PORT ?? 4000;
const JWT_SECRET = process.env.JWT_SECRET;
const RAZORPAY_KEY_ID = "rzp_test_SKeVaEG3gFZqga";
const RAZORPAY_KEY_SECRET = "NhR4O5rrHovOSLO4Qp2QekY2";

app.use(cors({ origin: true }));
app.use(express.json());

function getUserId(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  if (!JWT_SECRET) return token ? "dev-user" : null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.id ?? decoded.sub ?? decoded.userId ?? "unknown";
  } catch {
    return null;
  }
}

function authMiddleware(req, res, next) {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.userId = userId;
  next();
}

// In-memory stores (replace with MongoDB in production)
const ordersByOrderId = new Map();
const productPrices = new Map();

function getProductPrice(productId) {
  return productPrices.get(String(productId)) ?? 499;
}

app.post("/api/v1/order/create-razorpay-order", authMiddleware, async (req, res) => {
  try {
    const { addressId, items } = req.body;
    if (!addressId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "addressId and items (non-empty array) are required" });
    }
    let subtotal = 0;
    for (const it of items) {
      const qty = Math.max(1, Number(it.quantity) || 1);
      const price = getProductPrice(it.productId);
      subtotal += price * qty;
    }
    const shipping = subtotal >= 999 ? 0 : 79;
    const total = Math.round(subtotal + shipping);
    const amountPaise = total * 100;
    const orderId = `ORD-${Date.now()}`;
    const order = {
      _id: orderId,
      orderId,
      userId: req.userId,
      addressId,
      items: items.map((it) => ({
        productId: it.productId,
        quantity: Math.max(1, Number(it.quantity) || 1),
      })),
      subtotal,
      shipping,
      total,
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      razorpayOrderId: null,
      razorpayPaymentId: null,
      createdAt: new Date().toISOString(),
    };
    ordersByOrderId.set(orderId, order);
    let razorpayOrderId = null;
    if (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) {
      const razorpay = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
      const rzOrder = await razorpay.orders.create({
        amount: amountPaise,
        currency: "INR",
        receipt: orderId,
      });
      razorpayOrderId = rzOrder.id;
      order.razorpayOrderId = razorpayOrderId;
      ordersByOrderId.set(orderId, order);
    } else {
      razorpayOrderId = `order_demo_${orderId}`;
      order.razorpayOrderId = razorpayOrderId;
      ordersByOrderId.set(orderId, order);
    }
    return res.status(200).json({
      message: "Order created. Complete payment using Razorpay.",
      data: {
        order: {
          _id: order._id,
          orderId: order.orderId,
          total: order.total,
          subtotal: order.subtotal,
          shipping: order.shipping,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          razorpayOrderId: order.razorpayOrderId,
        },
        razorpayOrderId,
        key_id: RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: amountPaise,
        currency: "INR",
      },
    });
  } catch (err) {
    console.error("create-razorpay-order error:", err);
    return res.status(500).json({ message: err.message || "Failed to create order" });
  }
});

app.post("/api/v1/order/verify-razorpay-payment", authMiddleware, (req, res) => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        message: "orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature are required",
      });
    }
    const order = ordersByOrderId.get(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.userId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (order.paymentMethod !== "razorpay") {
      return res.status(400).json({ message: "Order is not a Razorpay order" });
    }
    if (order.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({ message: "Razorpay order id mismatch" });
    }
    let valid = false;
    if (RAZORPAY_KEY_SECRET) {
      const expected = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");
      valid = expected === razorpay_signature;
    } else {
      valid = true;
    }
    if (!valid) {
      order.paymentStatus = "failed";
      ordersByOrderId.set(orderId, order);
      return res.status(400).json({ message: "Invalid payment signature" });
    }
    order.paymentStatus = "confirmed";
    order.razorpayPaymentId = razorpay_payment_id;
    ordersByOrderId.set(orderId, order);
    return res.status(200).json({
      message: "Payment verified successfully",
      data: { order },
    });
  } catch (err) {
    console.error("verify-razorpay-payment error:", err);
    return res.status(500).json({ message: err.message || "Verification failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Order API running at http://localhost:${PORT}`);
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    console.warn("RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET not set: using demo mode (create order will use placeholder razorpay order id; verify will accept any signature).");
  }
  if (!JWT_SECRET) {
    console.warn("JWT_SECRET not set: accepting any Bearer token for dev.");
  }
});
