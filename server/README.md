# Order API (Razorpay)

Runs at `http://localhost:4000` by default.

## Setup

```sh
npm i
cp .env.example .env
```

Edit `.env`:

- `JWT_SECRET` – Same secret used by your auth API to sign JWTs. If unset, any Bearer token is accepted (dev only).
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` – From [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys). If unset, create order returns a placeholder Razorpay order id and verify accepts any signature (demo only).

## Run

```sh
npm run dev
```

## Endpoints

- `POST /api/v1/order/create-razorpay-order` – Body: `{ addressId, items: [{ productId, quantity }] }`. Creates your order and a Razorpay order; returns `order`, `razorpayOrderId`, `key_id`, `amount`, `currency`.
- `POST /api/v1/order/verify-razorpay-payment` – Body: `{ orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature }`. Verifies HMAC and sets `paymentStatus: "confirmed"`.

Both require `Authorization: Bearer <jwt>`.
