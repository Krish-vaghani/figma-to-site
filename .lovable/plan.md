# Adding Engagement & Conversion Features

This plan covers 4 new features: a Spin-the-Wheel popup, a Loyalty Rewards banner, Wishlist sharing, and a Bundle Deals section.

---

## 2. Loyalty / Rewards Program Banner

A persistent, eye-catching banner on the homepage encouraging sign-ups to a loyalty program.

**How it works:**

- A new section on the homepage between Testimonials and Footer
- Shows "Earn Points on Every Purchase" with 3 benefit cards (Earn, Redeem, Exclusive Access)
- A "Join Now" CTA button
- Dismissible with a small close icon; dismissed state stored in localStorage
- Fully responsive: stacked on mobile, side-by-side on desktop

**Files created:**

- `src/components/LoyaltyBanner.tsx`

**Files changed:**

- `src/pages/Index.tsx` -- Add LoyaltyBanner section before Footer

---

## 3. Wishlist Sharing

Allow users to share their wishlist via social media or copy a link.

**How it works:**

- Add a "Share Wishlist" button in the Navbar's wishlist area (visible when wishlist has items)
- Clicking opens a small popover/dialog with share options: Copy Link, WhatsApp, Twitter/X, Facebook
- The share link encodes wishlist product IDs as URL query params (e.g., `/purses?wishlist=1,3,5`)
- When visiting a shared link, a banner shows "Viewing [Name]'s Wishlist" with the selected products highlighted
- Uses the Web Share API on mobile when available, with fallback buttons

**Files changed:**

- `src/contexts/WishlistContext.tsx` -- Add `getShareUrl()` and `loadSharedWishlist()` helpers
- `src/components/Navbar.tsx` -- Add share button next to wishlist icon with a popover containing share options

**Files created:**

- `src/components/WishlistShareDialog.tsx` -- Share dialog/popover component with social links and copy-to-clipboard

---

## 4. Bundle Deals Section

A homepage section showcasing "Buy 2 Save 20%" bundle offers.

**How it works:**

- New section on the homepage between New Arrivals and Testimonials
- Shows a headline "Bundle & Save" with a tagline "Buy 2 Save 20%"
- Displays 2-3 curated bundle cards, each showing 2 product images side by side with combined pricing
- Each bundle card has an "Add Bundle to Cart" button that adds both products at the discounted price
- Responsive: cards stack on mobile, grid on tablet/desktop

**Files created:**

- `src/components/BundleDealsSection.tsx` -- Bundle cards with product pairings, pricing logic (20% off when 2 selected), and add-to-cart integration

**Files changed:**

- `src/pages/Index.tsx` -- Add BundleDealsSection between NewArrivalsSection and TestimonialsSection

---

## Technical Details

- **Share functionality**: Uses `navigator.share` API with fallback to manual share buttons. URLs are encoded with `encodeURIComponent`.
- **Bundle pricing**: Calculated client-side from existing product data. The 20% discount is applied to the lower-priced item in each pair.
- **All new components** follow existing patterns: Framer Motion for entrance animations, Tailwind for styling, Lucide for icons, coral accent color, rounded-full buttons.
- **Lazy loading**: All new homepage sections will be lazy-loaded like existing sections for performance.