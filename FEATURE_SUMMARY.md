# Guest Cart & Wishlist Feature - Implementation Summary

## Overview
Successfully implemented guest user support for add-to-cart and wishlist operations in the toy e-commerce frontend application. Guest users can now accumulate items without logging in, with automatic redirect to login when attempting protected actions.

## Features Implemented

### 1. **Guest Cart Persistence** ([CartContext.jsx](toy/frontend/src/context/CartContext.jsx))
- ✅ Guest items stored in `localStorage` under key `guestCart`
- ✅ Automatic product snapshot capture with price, name, images, and stock info
- ✅ Add/Update/Remove/Clear operations for guest cart
- ✅ Guest cart merges into authenticated cart after user logs in via [Login.jsx](toy/frontend/src/pages/Login.jsx)
- ✅ Real-time cart sync via `cart:updated` custom event

**Key Functions:**
- `readGuestCart()` - Read persisted items from localStorage
- `writeGuestCart(items)` - Persist items to localStorage and dispatch sync event
- `normalizeGuestItem(item)` - Normalize product structure for consistency
- `resolveGuestProductSnapshot(productId)` - Fetch product details on add (with fallback)
- `buildGuestCartState(items)` - Compute total amount from guest items

### 2. **Guest Wishlist Support** ([Wishlist.jsx](toy/frontend/src/pages/Wishlist.jsx))
- ✅ Guest wishlist stored in `localStorage` under key `wishlist`
- ✅ Display guest wishlist items alongside authenticated wishlist
- ✅ Add/Remove from wishlist for guests
- ✅ Real-time wishlist sync via `wishlist:updated` custom event
- ✅ Guest wishlist toggle in [ProductCard.jsx](toy/frontend/src/component/common/ProductCard.jsx)

### 3. **Protected Action Redirects**
The following actions trigger login redirect with `?redirect=<page>` query param to restore user state after login:

| Component | Action | Redirect |
|-----------|--------|----------|
| ProductCard | Add to Cart (guest) | Inline guest localStorage |
| ProductCard | Wishlist Toggle (guest) | Inline guest localStorage |
| ProductInfo | Buy Now | `/login?redirect=/product/:id` |
| ProductInfo | Add to Cart (guest) | Inline guest localStorage |
| Checkout | Place Order | `/login?redirect=/cart` |
| CartSummary | Checkout CTA | `/login?redirect=/cart` |

**Auth Guard Helper** ([authGuard.js](toy/frontend/src/utils/authGuard.js)):
```javascript
buildLoginRedirectUrl(returnPath) // Build login URL with redirect query param
redirectToLogin(returnPath) // Navigate to login and show toast notification
isLoggedIn() // Check if user has valid token
```

### 4. **Axios Interceptor** ([axios.js](toy/frontend/src/api/axios.js))
- ✅ Automatically catches 401 responses from protected backend routes
- ✅ Shows `Please log in` toast notification
- ✅ Redirects to `/login?redirect=<current-page>` for recovery
- ✅ Clears stale token/user from localStorage

### 5. **Login Page Integration** ([Login.jsx](toy/frontend/src/pages/Login.jsx))
- ✅ After successful login, checks for guest cart in `localStorage.guestCart`
- ✅ Merges guest items into authenticated cart via cart service
- ✅ Clears `guestCart` after merge
- ✅ Navigates to `?redirect=` URL if provided, otherwise to dashboard

## User Flow

### Scenario: Guest user browsing and adding to cart

1. **Open Product Page** → Product displays with "Add to Cart" and wishlist heart
2. **Click "Add to Cart"** (no login) → Item stored in localStorage `guestCart`
3. **Navigate to Cart** → Guest items displayed with quantities and totals
4. **Click "Checkout"** → Redirect to `/login?redirect=/cart`
5. **Log In** → Guest cart automatically merged into user's authenticated cart
6. **Proceed to Checkout** → Full checkout flow with saved guest items

### Scenario: Guest user adding to wishlist

1. **Click Wishlist Heart** → Item ID stored in localStorage `wishlist`
2. **Navigate to Wishlist Page** → Guest wishlist items displayed
3. **Try to Add from Wishlist to Cart** → Guest cart flow (see above)
4. **Log In** → Wishlist syncs from API after authentication

## Technical Architecture

### Guest vs. Authenticated Decision Tree
```
Request to add item / checkout / buy-now:
├── Check localStorage.token
│   ├── Token exists
│   │   └── Call authenticated API endpoint
│   │       ├── Success → Update context
│   │       └── 401 Error → Toast + Redirect to /login?redirect=...
│   └── No token
│       ├── Cart/Wishlist action → Use localStorage + context update
│       └── Protected action (checkout, buy-now) → Redirect to /login?redirect=...
```

### localStorage Keys Used
- `token` - JWT authentication token
- `user` - User profile object
- `guestCart` - Array of guest cart items with product snapshots
- `wishlist` - Array of wishlist product IDs

### Event Emitters
- `window.dispatchEvent(new CustomEvent("cart:updated"))` - Triggers cart sync
- `window.dispatchEvent(new CustomEvent("wishlist:updated"))` - Triggers wishlist sync

## Files Modified

| File | Changes |
|------|---------|
| [CartContext.jsx](toy/frontend/src/context/CartContext.jsx) | Added guest cart persistence, localStorage read/write, product snapshots |
| [Wishlist.jsx](toy/frontend/src/pages/Wishlist.jsx) | Added guest wishlist display, remove, add-to-cart flows |
| [ProductCard.jsx](toy/frontend/src/component/common/ProductCard.jsx) | Already had guest wishlist support; integrated with context |
| [ProductInfo.jsx](toy/frontend/src/component/product/ProductInfo.jsx) | Added buy-now and add-to-cart guest redirects |
| [Login.jsx](toy/frontend/src/pages/Login.jsx) | Added guest cart merge after login |
| [Checkout.jsx](toy/frontend/src/pages/Checkout.jsx) | Added login check before order placement |
| [CartSummary.jsx](toy/frontend/src/component/cart/CartSummary.jsx) | Added checkout redirect guard |
| [axios.js](toy/frontend/src/api/axios.js) | Added 401 error handler with redirect |
| [authGuard.js](toy/frontend/src/utils/authGuard.js) | Created new helper for login redirects |

## Testing Checklist

- [ ] Add item to cart as guest → item persists in localStorage `guestCart`
- [ ] Refresh page → guest cart restored in UI
- [ ] Increment quantity → quantity updates in localStorage and context
- [ ] Remove from cart → item removed from localStorage
- [ ] Open wishlist as guest → wishlist page shows guest items from localStorage
- [ ] Toggle wishlist heart as guest → item ID added/removed from `wishlist`
- [ ] Log in → guest cart merged into authenticated cart
- [ ] Log in → guest wishlist items sync with authenticated wishlist
- [ ] Click buy-now as guest → redirect to `/login?redirect=/product/:id`
- [ ] Click checkout as guest → redirect to `/login?redirect=/cart`
- [ ] API 401 error → automatic redirect to `/login` with toast

## Notes

- Guest cart is **not synced to backend** — only stored locally
- Guest cart **merges on login** via manual API calls in Login.jsx
- Cart total calculation uses product snapshot prices at add time (not live prices)
- Wishlist for guests is **ID-only** (no full product details cached)
- Feature is **fully backward compatible** with authenticated-only flows

---

**Build Status:** ✅ No errors  
**Implementation Date:** Current Session  
**Feature Request:** Allow guests to add products to cart/wishlist without login, with automatic redirect on protected actions
