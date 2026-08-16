# Razorpay Payment Integration - Complete Documentation

## 🎯 Overview

This document covers the complete Razorpay payment integration for the e-commerce platform. Users can now choose between **Cash on Delivery (COD)** and **Razorpay** payment methods during checkout.

---

## ✅ Implementation Status

### Backend - ✅ COMPLETE
All backend components for Razorpay payment are fully implemented and tested.

### Frontend - ✅ COMPLETE  
All frontend components for Razorpay payment are fully implemented and integrated.

---

## 📦 What's Included

### Backend Components

#### 1. **Razorpay Configuration**
- **File:** `/backend/src/config/razorpay.js`
- **Purpose:** Initialize Razorpay client with API credentials
- **Key Function:** `getRazorpayClient()` - Lazy-loads Razorpay client

```javascript
import Razorpay from "razorpay";

let razorpayClient = null;

const getRazorpayClient = () => {
  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpayClient;
};
```

#### 2. **Payment Service**
- **File:** `/backend/src/services/payment.service.js`
- **Functions:**
  - `createRazorpayOrder(userId)` - Create order for payment
  - `verifyPayment(userId, paymentData)` - Verify and process payment

**Flow:**
1. Get user's cart
2. Validate items and calculate total
3. Create Razorpay order with amount in paise
4. Return order details with API key to frontend

#### 3. **Payment Controller**
- **File:** `/backend/src/controllers/payment.controller.js`
- **Endpoints:**
  - `POST /orders/razorpay` - Create Razorpay order
  - `POST /orders/verify-payment` - Verify payment and create order

#### 4. **Order Model**
- **Payment Methods:** `["COD", "RAZORPAY"]`
- **Payment Status:** `["PENDING", "PAID", "FAILED", "REFUNDED"]`
- **Payment Result Schema:**
  ```javascript
  {
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    timestamp: Date
  }
  ```

#### 5. **Environment Variables**
**File:** `/backend/.env`
```env
RAZORPAY_KEY_ID=rzp_test_TJdawyjCgqWNZo
RAZORPAY_KEY_SECRET=OMaK8Vo83babJBLAcrj1JqQT
```

> ⚠️ **TEST KEYS CURRENTLY ACTIVE** - Replace with production keys before deployment

---

### Frontend Components

#### 1. **Payment Method Component**
- **File:** `/frontend/src/component/checkout/PaymentMethod.jsx`
- **Purpose:** Display payment method selection UI
- **Features:**
  - Radio button selection
  - Visual feedback for active method
  - Supports COD and Razorpay

#### 2. **Checkout Page**
- **File:** `/frontend/src/pages/Checkout.jsx`
- **Key Changes:**
  - Added `verifyPayment` import
  - Complete Razorpay payment flow implementation
  - Payment modal handler with success/failure logic

**Payment Flow:**
```
1. User selects "Razorpay" payment method
2. User clicks "Place Order"
3. Form validation
4. Create Razorpay Order → Backend
5. Open Razorpay Checkout Modal
6. User completes payment
7. Verify Payment Signature → Backend
8. Create Order in Database
9. Clear Cart & Redirect to Orders Page
```

#### 3. **Order Service**
- **File:** `/frontend/src/services/order.service.js`
- **Functions:**
  - `createRazorpayOrder()` - POST to `/orders/razorpay`
  - `verifyPayment(payload)` - POST to `/orders/verify-payment`

```javascript
export const createRazorpayOrder = async () => {
  const { data } = await api.post("/orders/razorpay");
  return { data };
};

export const verifyPayment = async (payload) => {
  const { data } = await api.post("/orders/verify-payment", payload);
  return data;
};
```

#### 4. **Razorpay Script**
- **File:** `/frontend/index.html`
- **Script:** `https://checkout.razorpay.com/v1/checkout.js`
- **Purpose:** Load Razorpay payment modal JavaScript library

---

## 🚀 How It Works

### Complete Payment Flow

#### Step 1: User Initiates Payment
```
Checkout Page → Select "Razorpay" → Enter Delivery Details → Click "Place Order"
```

#### Step 2: Create Razorpay Order (Backend)
```javascript
GET /api/user/cart
VALIDATE items
CALCULATE total = subtotal + tax + shipping
CREATE razorpay order:
  amount: total * 100 (paise)
  currency: "INR"
  receipt: unique_receipt_id
RETURN:
  {
    orderId: "order_xxxxx",
    amount: 50000,
    currency: "INR",
    key: "rzp_test_xxxxx"
  }
```

#### Step 3: Open Payment Modal (Frontend)
```javascript
const options = {
  key: razorpayData.key,           // Razorpay Public Key
  amount: razorpayData.amount,     // Amount in paise
  currency: razorpayData.currency, // "INR"
  order_id: razorpayData.orderId,  // Order ID from backend
  handler: async (response) => {   // Payment success callback
    // Verify payment...
  },
  prefill: {
    name: userFullName,
    contact: userPhone
  },
  theme: { color: "#FF9500" }      // Orange brand color
};

const razorpay = new window.Razorpay(options);
razorpay.open();
```

#### Step 4: Verify Payment (Backend)
```javascript
RECEIVE:
  razorpayOrderId: "order_xxxxx"
  razorpayPaymentId: "pay_xxxxx"
  razorpaySignature: "signature_xxxxx"

VERIFY signature:
  body = `${orderId}|${paymentId}`
  expectedSignature = HMAC-SHA256(body, KEY_SECRET)
  IF signature matches:
    CREATE order in database
    CLEAR user cart
    RETURN success
  ELSE:
    RETURN error

ORDER stored with:
  paymentMethod: "RAZORPAY"
  paymentStatus: "PAID"
  paymentResult: {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    timestamp
  }
```

#### Step 5: Complete Order (Frontend)
```javascript
IF payment verified:
  toast.success("Payment successful! Order placed.")
  Clear cart
  Navigate to /orders page
ELSE:
  toast.error("Payment verification failed")
  Allow user to retry
```

---

## 💳 Testing the Integration

### Test Cards (Razorpay Test Mode)

| Card | CVV | Expiry | Result |
|------|-----|--------|--------|
| 4111 1111 1111 1111 | Any 3 digits | Any future date | Success |
| 4012 0010 1010 1010 | Any 3 digits | Any future date | Failure |

### Test Flow

1. **Start Checkout**
   ```bash
   Navigate to http://localhost:3000/checkout
   Add items to cart if empty
   ```

2. **Enter Delivery Details**
   ```
   Full Name: John Doe
   Phone: 9876543210
   Address: 123 Main St
   City: New York
   State: NY
   PIN Code: 110001
   ```

3. **Select Razorpay**
   ```
   Payment Method → Choose "Razorpay"
   Click "Place Order"
   ```

4. **Complete Payment**
   ```
   Razorpay modal opens
   Enter test card: 4111 1111 1111 1111
   CVV: Any 3 digits
   Expiry: Any future date
   Authorize payment
   ```

5. **Verify Success**
   ```
   Should see: "Payment successful! Order placed."
   Redirected to: /orders page
   Cart should be cleared
   ```

---

## 🔒 Security Features

### 1. **Payment Signature Verification**
- Backend verifies Razorpay signature before creating order
- Prevents fraudulent payments
- Uses HMAC-SHA256 algorithm

### 2. **Duplicate Payment Prevention**
- Database checks for existing payment with same `razorpayPaymentId`
- Prevents double-charging if user refreshes page

### 3. **Transactional Integrity**
- MongoDB transactions ensure atomic order creation
- If any step fails, entire transaction rolls back
- Cart is only cleared after successful order creation

### 4. **User Authentication**
- All payment endpoints require authentication token
- Users can only access their own orders
- Admin can access all orders

---

## 🌐 Deployment Configuration

### Production Razorpay Keys

1. **Create Razorpay Account**
   - Visit: https://dashboard.razorpay.com
   - Sign up and verify email/phone

2. **Get Production Keys**
   - Go to Settings → API Keys
   - Copy Key ID and Key Secret (Production keys)

3. **Update .env File**
   ```env
   RAZORPAY_KEY_ID=rzp_live_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx
   ```

4. **Update Frontend Base URLs**
   - Ensure frontend API_BASE_URL points to production backend

### Deployment Platforms

#### Render.com (Backend)
```env
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

#### Vercel/Netlify (Frontend)
```env
VITE_API_BASE_URL=https://your-backend-url.com/api
```

---

## 🐛 Troubleshooting

### Issue 1: Razorpay Modal Not Opening
**Symptoms:** Click "Place Order" but nothing happens

**Solutions:**
1. Check browser console for errors
2. Verify Razorpay script loaded: `window.Razorpay` should exist
3. Check `.env` file has valid `RAZORPAY_KEY_ID`
4. Ensure backend endpoint `/orders/razorpay` is working

### Issue 2: Payment Verification Failed
**Symptoms:** Modal shows success but verification fails on backend

**Solutions:**
1. Verify `RAZORPAY_KEY_SECRET` is correct (not expired)
2. Check network tab for actual response from verification endpoint
3. Ensure signature calculation matches Razorpay's format
4. Check MongoDB connection for order creation

### Issue 3: Order Not Created After Payment
**Symptoms:** Payment shows success but no order in database

**Solutions:**
1. Check backend logs for transaction errors
2. Verify cart items are still available
3. Ensure user has valid address information
4. Check MongoDB transaction support (requires replica set)

### Issue 4: Cart Not Clearing After Order
**Symptoms:** Cart remains with items after successful order

**Solutions:**
1. Check `fetchCart()` is being called
2. Verify backend `clearCart()` API is working
3. Check localStorage is not preventing clear
4. Try browser refresh

### Issue 5: CORS Errors
**Symptoms:** Network errors when calling backend APIs

**Solutions:**
1. Verify backend CORS configuration includes frontend URL
2. Check backend is running and accessible
3. Ensure API base URL is correct in .env
4. Check network tab for actual error details

---

## 📊 Database Schema

### Order Document (with Razorpay payment)
```javascript
{
  _id: ObjectId,
  user: userId,
  orderNumber: "ORD-20240116-12345",
  
  // Delivery Information
  shippingAddress: {
    fullName: "John Doe",
    phone: "9876543210",
    addressLine1: "123 Main St",
    landmark: "Near Park",
    city: "New York",
    state: "NY",
    postalCode: "110001"
  },
  
  // Items
  items: [
    {
      product: productId,
      name: "Product Name",
      image: "url",
      quantity: 2,
      price: 100,
      discountPrice: 80
    }
  ],
  
  // Payment
  paymentMethod: "RAZORPAY",
  paymentStatus: "PAID",
  paymentResult: {
    razorpayOrderId: "order_xxxxx",
    razorpayPaymentId: "pay_xxxxx",
    razorpaySignature: "signature_xxxxx",
    timestamp: Date
  },
  
  // Order Status
  orderStatus: "CONFIRMED",
  totalPrice: 160,
  tax: 8,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📝 API Endpoints

### Create Razorpay Order
```
POST /api/orders/razorpay
Authorization: Bearer <token>

Response:
{
  "statusCode": 200,
  "data": {
    "orderId": "order_xxxxx",
    "amount": 50000,
    "currency": "INR",
    "key": "rzp_test_xxxxx"
  },
  "message": "Razorpay order created successfully."
}
```

### Verify Payment
```
POST /api/orders/verify-payment
Authorization: Bearer <token>

Body:
{
  "razorpayOrderId": "order_xxxxx",
  "razorpayPaymentId": "pay_xxxxx",
  "razorpaySignature": "signature_xxxxx",
  "shippingAddress": { ... }
}

Response:
{
  "statusCode": 201,
  "data": {
    "_id": orderId,
    "orderNumber": "ORD-xxx",
    "paymentStatus": "PAID",
    "orderStatus": "CONFIRMED"
  },
  "message": "Order created successfully and payment verified."
}
```

---

## ✨ Features

✅ **Dual Payment Methods** - COD and Razorpay  
✅ **Secure Payment Verification** - HMAC-SHA256 signature validation  
✅ **Order Tracking** - Users can track orders after payment  
✅ **Admin Dashboard** - View all orders with payment status  
✅ **Payment History** - Full payment details stored  
✅ **Refund Support** - Refund status tracking  
✅ **Error Handling** - Graceful failure handling  
✅ **Mobile Responsive** - Works on all devices  

---

## 🎯 Next Steps

1. **Test thoroughly** with test cards and different scenarios
2. **Get production Razorpay keys** when ready for live
3. **Update environment variables** for production
4. **Configure backend CORS** for production domains
5. **Set up error monitoring** (e.g., Sentry)
6. **Create user documentation** for payment process
7. **Set up refund workflow** in admin dashboard

---

## 📚 Resources

- **Razorpay Documentation:** https://razorpay.com/docs/
- **API Reference:** https://razorpay.com/docs/api/
- **Test Cards:** https://razorpay.com/docs/payments/payments/test-cards/
- **Integration Checklist:** https://razorpay.com/docs/payments/live-mode-checklist/

---

**Status:** ✅ Production Ready (with test keys)  
**Last Updated:** 2024-01-16  
**Version:** 1.0
