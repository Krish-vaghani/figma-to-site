# Static / Dummy Data Audit

Places in the project where **static or dummy data** is used instead of API/dynamic data.

---

## APIs we have and use

| API | Endpoint / usage | Used in |
|-----|------------------|--------|
| **Landing** | `GET /landing` | Index (hero, collections, new arrivals, elevate) |
| **Product list** | `GET /product/list?page=&limit=&category=` | Purses, SearchModal, RelatedProducts, ProductDetail (slug→id), landing fallbacks |
| **Product detail** | `GET /product/detail/:id?reviewPage=&reviewLimit=` | ProductDetail (data, numberOfReviews, reviews) |
| **Product view** | `POST /product/:id/view` | ShopProductCard, CollectionsSection, NewArrivalsSection (fire-and-forget) |
| **Auth** | login / register | Auth flow |
| **Address** | list (GET), add (POST), update (PUT), delete (DELETE) | AddressContext, Addresses page |
| **Wishlist** | list (GET), add (POST), remove (DELETE) | WishlistContext, Wishlist page |
| **Cart** | list (GET), add (POST), update (PUT), remove (DELETE) | CartContext, Checkout |
| **Order** | create-razorpay-order, verify-razorpay-payment | Checkout |
| **Testimonial** | `GET /testimonial/list` (direct fetch) | TestimonialsSection |

---

## Required / missing APIs

- **Product reviews (optional):** If the backend does **not** return `reviews` in the product detail response, a dedicated `GET /product/:id/reviews?page=&limit=` would be needed. Right now we use detail `reviews` when present, else mock.
- **Related products (optional):** We use the **product list** API and exclude the current product; a dedicated `GET /product/:id/related` could replace this.
- **Search (optional):** We use **product list** + client-side filter in SearchModal; a `GET /product/search?q=` would allow server-side search.
- **Orders list (optional):** `GET /orders` (or similar) to replace or supplement OrderContext’s localStorage.
- **Categories (optional):** If the backend has a categories endpoint, CategoriesSection could use it instead of the static list.
- **Bundle definitions (optional):** If the backend has bundle config, BundleDealsSection could use it instead of static `bundles` and product ids.

---

## 1. **`src/data/products.ts`**
- **What:** Full static product list (`products: Product[]`) with ~4+ items (Aurora Mini Purse, Velora Crossbody, etc.) and local image URLs from `@/lib/assetUrls`.
- **Also exports:** `getStockStatus(stock)` helper (used by StockBadge).
- **Used as fallback or source in:** Cart, Wishlist, ProductDetail (local match), Profile, BundleDealsSection, CollectionsSection, NewArrivalsSection, RelatedProducts, SearchModal (see below).

---

## 2. **`src/components/product-detail/ReviewsSection.tsx`**
- **What:** `mockReviews` – hardcoded array of 3 reviews (Courtney Henry, Lorem ipsum text, local avatars). **Now:** When product detail API returns `reviews` (via `apiReviews` prop), those are shown; otherwise mock is used.
- **Usage:** Review cards use API reviews when provided; fallback to mock.

---

## 3. **`src/components/product-detail/RelatedProducts.tsx`**
- **What:** **Now uses product list API** first; falls back to static `products` from `@/data/products` when API returns no data.
- **Usage:** Related items from API when available; otherwise static list.

---

## 4. **`src/pages/Cart.tsx`**
- **What:** `getProduct(id)` looks up product by id in static `products` from `@/data/products` (for labels/descriptions when cart has API ids, lookup may fail).
- **Usage:** Product name/description in cart rows come from this lookup when available.

---

## 5. **`src/pages/Wishlist.tsx`**
- **What:** When not using API wishlist items, uses `products.filter(...)` from `@/data/products` for display. Also merges “missing” ids from API wishlist by resolving from static `products`.
- **Usage:** Fallback product list and filling in optimistic items from static data.

---

## 6. **`src/pages/Profile.tsx`**
- **What:** “Recently viewed” (or similar) uses `products.filter((p) => wishlist.includes(p.id))` from `@/data/products`.
- **Usage:** Profile page product list is static.

---

## 7. **`src/components/BundleDealsSection.tsx`**
- **What:** Static `bundles` array: `[ { ids: [1, 3], label: "Day Essentials" }, { ids: [2, 4], label: "Evening Glam" }, { ids: [3, 6], label: "Tote & Crossbody" } ]`. Products resolved via `products.find(p => p.id === id)` from `@/data/products`.
- **Usage:** Bundle deals section is fully static (bundle definitions + product data).

---

## 8. **`src/components/CollectionsSection.tsx`**
- **What:** Fallback when no landing API data: `products.slice(0, 4)` from `@/data/products`.
- **Usage:** Carousel shows static products when API has no data.

---

## 9. **`src/components/NewArrivalsSection.tsx`**
- **What:** Fallback when no landing API data: `products.slice(0, 5)` from `@/data/products`.
- **Usage:** Carousel shows static products when API has no data.

---

## 10. **`src/components/SearchModal.tsx`**
- **What:** **Now uses product list API** (`useGetProductListQuery`); search and filters (category, price) are applied client-side to API results.
- **Usage:** Search results from API; no static product list.

---

## 11. **`src/components/CategoriesSection.tsx`**
- **What:** Static `categories` array: Tote Bags, Shoulder Bags, Sling Bags, Clutches Bags, Mini Bags, Office Bags with images from `@/lib/assetUrls` (categoryTote, categorySling, etc.). Ignores landing API `data` prop for the grid.
- **Usage:** Category circles and names are all static.

---

## 12. **`src/components/TestimonialsSection.tsx`**
- **What:** `fallbackRow1` and `fallbackRow2` – hardcoded testimonial cards (Sarah Williamson, Ahmad Korsgaard, etc.) when API fails or returns empty. Uses avatars from `@/lib/assetUrls`.
- **Usage:** Fallback only; main data comes from testimonial API.

---

## 13. **`src/components/ElevateSection.tsx`**
- **What:** Static images `elevate1`, `elevate2`, `elevate3`, `elevate4` from `@/lib/assetUrls` for 3 of 4 image slots; first slot can use API `data?.images?.[0]` when provided.
- **Usage:** Most of the “Elevate” images are static.

---

## 14. **`src/components/HeroSection.tsx`**
- **What:** Fallback image `heroProduct` from `@/lib/assetUrls` when landing API has no image; avatar image for a card is static.
- **Usage:** Hero image can be API or static; one avatar is always static.

---

## 15. **`src/pages/ProductDetail.tsx`**
- **What:**  
  - Local product match from static `products` (by id/slug) when URL matches.  
  - **Now:** `totalReviews` from product detail API (`numberOfReviews`) when available, else 78. Reviews section receives `apiReviews` from detail response when API returns them.
- **Usage:** Detail from API or static; review count and review list from API when present.

---

## 16. **`src/pages/Index.tsx`**
- **What:** `heroBgImage` – hardcoded URL: `https://vedify-backend-dev.s3.eu-north-1.amazonaws.com/uploads/uploads/1770632691901_Frame_2147225909.png`.
- **Usage:** Hero header background image is static.

---

## 17. **`src/contexts/OrderContext.tsx`**
- **What:** `buildTrackingTimeline(placedAt)` – static timeline labels/descriptions (Order Placed, Order Confirmed, Shipped, etc.) with computed timestamps. Orders themselves are from localStorage (or added from Razorpay flow), not from an orders API.
- **Usage:** Order status labels and structure are static; order list is local.

---

## 18. **`src/components/StockBadge.tsx`**
- **What:** Imports `getStockStatus(stock)` from `@/data/products` (logic only; no product list).
- **Usage:** Uses static thresholds/labels for “Low stock” etc.

---

## 19. **Static asset URLs (`@/lib/assetUrls`, `src/generated-asset-urls.json`)**
- **What:** All UI assets (logo, hero, products 1–4, categories, elevate, avatars, shop/footer backgrounds, etc.) point to fixed URLs (e.g. vedify S3 or similar).
- **Usage:** Used wherever images/icons are needed; not loaded from a CMS or config API.

---

## Summary table

| Location | Type | Description |
|----------|------|-------------|
| `data/products.ts` | Static list | Main product array + getStockStatus |
| `ReviewsSection.tsx` | API + mock | API reviews when provided; else mock |
| `RelatedProducts.tsx` | API + fallback | Product list API; fallback `products` |
| `Cart.tsx` | Static lookup | getProduct from `products` |
| `Wishlist.tsx` | Static fallback | Products from `products` when no API |
| `Profile.tsx` | Static list | Profile products from `products` |
| `BundleDealsSection.tsx` | Static data | Bundles + products from `products` |
| `CollectionsSection.tsx` | Static fallback | products.slice(0, 4) |
| `NewArrivalsSection.tsx` | Static fallback | products.slice(0, 5) |
| `SearchModal.tsx` | API | Product list API + client filters |
| `CategoriesSection.tsx` | Static list | categories array + assetUrls |
| `TestimonialsSection.tsx` | Static fallback | fallbackRow1/2 |
| `ElevateSection.tsx` | Static images | elevate1–4 from assetUrls |
| `HeroSection.tsx` | Static fallback | heroProduct, avatar |
| `ProductDetail.tsx` | API + static | totalReviews/reviews from API when present; local match fallback |
| `Index.tsx` | Static URL | heroBgImage |
| `OrderContext.tsx` | Static labels | buildTrackingTimeline |
| `StockBadge.tsx` | Static helper | getStockStatus from data/products |
| `assetUrls` / generated JSON | Static URLs | All image/asset URLs |

To make the app fully API-driven, replace or back the above with: product list/detail APIs, review API, related-products API, category API, search API, orders API, and config/CMS for assets and copy where desired.
