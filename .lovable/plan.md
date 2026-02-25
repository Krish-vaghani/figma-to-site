

# Loopholes and Improvement Plan

## Current Loopholes Found

### 1. No Route Protection (Critical)
Pages like `/profile`, `/orders`, `/checkout`, `/addresses`, `/wishlist` are accessible even when the user is **not logged in**. Anyone can visit `/profile` and see a broken page, or go to `/checkout` without authentication.

### 2. Logged-in Users Can Access `/login`
If a user is already logged in, they can still visit the login page instead of being redirected to their profile.

### 3. Order Link Bug in Profile
In `Profile.tsx` line 63, the order link navigates to `/orders/${order.id}` but the actual route is `/order/${order.id}` (no "s"). This means clicking any order from the profile page leads to a 404.

### 4. "Resend OTP" Does Nothing
In `Login.tsx` line 269-274, the "Resend" button only clears the OTP fields but doesn't actually call the API to resend the OTP.

### 5. Cart/Wishlist/Orders Not Tied to User
All data is stored in localStorage globally. If User A logs out and User B logs in on the same browser, User B sees User A's cart, wishlist, orders, and addresses.

### 6. No Logout Confirmation
Clicking logout immediately logs out without any confirmation dialog, which could lead to accidental logouts.

### 7. Checkout Address Form Flow Issue
In `Checkout.tsx`, the `AddressForm` `onSubmit` only saves the form data (`setNewFormData`) but doesn't trigger order placement. The user must then click a separate "Place Order" button. This two-step flow on the same form is confusing.

---

## Improvement Plan

### Fix 1: Protected Routes
Create a `ProtectedRoute` wrapper component that checks `isLoggedIn` from `AuthContext`. If not logged in, redirect to `/login` with a return URL. Wrap routes: `/profile`, `/orders`, `/order/:id`, `/checkout`, `/addresses`, `/order-success/:id`.

**Files:**
- Create `src/components/ProtectedRoute.tsx`
- Update `src/App.tsx` -- wrap protected routes

### Fix 2: Redirect Logged-in Users from `/login`
Add a check at the top of `Login.tsx`: if `isLoggedIn`, redirect to `/profile`.

**File:** `src/pages/Login.tsx`

### Fix 3: Fix Order Link in Profile
Change `/orders/${order.id}` to `/order/${order.id}` on line 63 of `Profile.tsx`.

**File:** `src/pages/Profile.tsx`

### Fix 4: Resend OTP
Wire the Resend button to call the `registerOrLogin` mutation again with the stored phone and name, and show a toast confirmation.

**File:** `src/pages/Login.tsx`

### Fix 5: User-scoped localStorage
Prefix localStorage keys with the user's phone number (e.g., `cart_9876543210`) so each user has their own data. Clear in-memory state on logout and reload from the new user's keys on login.

**Files:**
- `src/contexts/CartContext.tsx`
- `src/contexts/WishlistContext.tsx`
- `src/contexts/OrderContext.tsx`
- `src/contexts/AddressContext.tsx`

### Fix 6: Logout Confirmation Dialog
Add an `AlertDialog` before logout in both `Profile.tsx` and `Navbar.tsx` mobile menu. Uses the existing Radix AlertDialog component.

**Files:**
- `src/pages/Profile.tsx`
- `src/components/Navbar.tsx`

---

## Technical Notes

- **ProtectedRoute** will use `Navigate` from react-router-dom with `state={{ from: location }}` so after login, users return to their intended page.
- **User-scoped storage** uses the auth token or phone as the namespace key. On login/logout, contexts re-read from the correct keys.
- All fixes follow existing patterns: Radix UI components, Tailwind styling, toast notifications from `@/lib/toast`.

