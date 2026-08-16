// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import CheckoutStepper from "../component/checkout/CheckoutStepper";
// import DeliveryAddress from "../component/checkout/DeliveryAddress";
// import PaymentMethod from "../component/checkout/PaymentMethod";
// import OrderSummary from "../component/checkout/OrderSummary";

// import useCart from "../hooks/useCart";
// import { buildLoginRedirectUrl } from "../utils/authGuard";

// import {
//     createCODOrder,
//     createRazorpayOrder,
//     verifyPayment,
// } from "../services/order.service";

// const Checkout = () => {

//     const navigate = useNavigate();

//     const {
//         cart,
//         fetchCart,
//     } = useCart();

//     const [loading, setLoading] = useState(false);

//     const [formData, setFormData] = useState({
//         fullName: "",
//         phone: "",
//         addressLine1: "",
//         landmark: "",
//         city: "",
//         state: "",
//         postalCode: "",
//     });

//     const [paymentMethod, setPaymentMethod] = useState("COD");

//     const handleChange = (e) => {

//         const { name, value } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));

//     };

//     const cartItems = cart.items || [];

//     const subtotal = cart.totalAmount || 0;

//     const shipping = 0;

//     const tax = Math.round(subtotal * 0.05);

//     const total = subtotal + shipping + tax;

//     const validateForm = () => {

//         if (!formData.fullName.trim()) {
//             return "Full Name is required.";
//         }

//         if (!/^[A-Za-z ]{3,50}$/.test(formData.fullName.trim())) {
//             return "Please enter a valid full name.";
//         }

//         if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
//             return "Please enter a valid 10-digit mobile number.";
//         }

//         if (!formData.addressLine1.trim()) {
//             return "Address is required.";
//         }

//         if (!formData.city.trim()) {
//             return "City is required.";
//         }

//         if (!/^[A-Za-z ]+$/.test(formData.city.trim())) {
//             return "Please enter a valid city.";
//         }

//         if (!formData.state.trim()) {
//             return "State is required.";
//         }

//         if (!/^[A-Za-z ]+$/.test(formData.state.trim())) {
//             return "Please enter a valid state.";
//         }

//         if (!/^\d{6}$/.test(formData.postalCode.trim())) {
//             return "Please enter a valid 6-digit PIN code.";
//         }

//         return null;

//     };

//     const handlePlaceOrder = async () => {

//         if (!localStorage.getItem("token")) {
//             toast.error("Please log in to continue.");
//             navigate(buildLoginRedirectUrl());
//             return;
//         }

//         if (loading) return;

//         if (cartItems.length === 0) {
//             return toast.error("Your cart is empty.");
//         }

//         const error = validateForm();

//         if (error) {
//             return toast.error(error);
//         }

//         try {

//             setLoading(true);

//             if (paymentMethod === "COD") {

//                 await createCODOrder({
//                     shippingAddress: formData,
//                 });

//                 await fetchCart();

//                 toast.success("Order placed successfully.");

              
//                 navigate("/orders");

//                 return;
//             }

//             if (paymentMethod === "RAZORPAY") {

//                 // Get Razorpay Order from Backend
//                 const { data: razorpayOrderData } = await createRazorpayOrder();

//                 if (!razorpayOrderData) {
//                     throw new Error("Failed to create Razorpay order");
                    
//                 }

//                 // Open Razorpay Checkout Modal
//                 const options = {
//                     key: razorpayOrderData.key,
//                     amount: razorpayOrderData.amount,
//                     currency: razorpayOrderData.currency || "INR",
//                     order_id: razorpayOrderData.orderId,
//                     handler: async (response) => {
//                         try {
//                             console.log("💳 Razorpay Response:", response);
                            
//                             // Verify Payment with Backend
//                             const verifyResult = await verifyPayment({
//                                 razorpayOrderId: response.razorpay_order_id,
//                                 razorpayPaymentId: response.razorpay_payment_id,
//                                 razorpaySignature: response.razorpay_signature,
//                                 shippingAddress: formData,
//                             });
                            
//                             console.log("✅ Payment Verified:", verifyResult);

//                             // Refresh Cart
//                             await fetchCart();

//                             toast.success("Payment successful! Order placed.");
//                             navigate("/orders");

//                         } catch (verificationError) {
//                             console.error("❌ Verification Failed:", verificationError);
//                             toast.error(
//                                 verificationError.response?.data?.message ||
//                                 verificationError.message ||
//                                 "Payment verification failed. Please contact support."
//                             );
//                         }
//                     },
//                     prefill: {
//                         name: formData.fullName,
//                         contact: formData.phone,
//                     },
//                     theme: {
//                         color: "#FF9500",
//                     },
//                     modal: {
//                         ondismiss: () => {
//                             toast.error("Payment cancelled.");
//                         },
//                     },
//                 };

//                 // Initialize Razorpay
//                 if (typeof window !== "undefined" && window.Razorpay) {
//                     const razorpay = new window.Razorpay(options);
//                     razorpay.open();
//                 } else {
//                     throw new Error("Razorpay script not loaded");
//                 }

//                 return;

//             }

//         } catch (error) {

//             toast.error(
//                 error.response?.data?.message ||
//                 "Failed to place order."
//             );

//         } finally {

//             setLoading(false);

//         }

//     };

//     if (cartItems.length === 0) {

//         return (

//             <section className="flex min-h-screen items-center justify-center">

//                 <div className="text-center">

//                     <h2 className="text-3xl font-bold">

//                         Your Cart is Empty

//                     </h2>

//                     <p className="mt-3 text-gray-500">

//                         Add some products before checkout.

//                     </p>

//                     <button
//                         onClick={() => navigate("/collection")}
//                         className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
//                     >

//                         Continue Shopping

//                     </button>

//                 </div>

//             </section>

//         );

//     }

//     return (

//         <section className="min-h-screen bg-[#FFF8F3] py-10">

//             <div className="mx-auto max-w-7xl px-5">

//                 <h1 className="mb-10 text-4xl font-bold text-gray-800">

//                     Checkout

//                 </h1>

//                 <CheckoutStepper />

//                 <div className="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">

//                     <div>

//                         <DeliveryAddress
//                             formData={formData}
//                             onChange={handleChange}
//                         />

//                         <PaymentMethod
//                             paymentMethod={paymentMethod}
//                             setPaymentMethod={setPaymentMethod}
//                         />

//                     </div>


//                     <OrderSummary
//                         cartItems={cartItems}
//                         subtotal={subtotal}
//                         shipping={shipping}
//                         tax={tax}
//                         total={total}
//                         loading={loading}
//                         paymentMethod={paymentMethod}
//                         onPlaceOrder={handlePlaceOrder}
//                     />

//                 </div>

//             </div>

//         </section>

//     );

// };

// export default Checkout;




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import CheckoutStepper from "../component/checkout/CheckoutStepper";
import DeliveryAddress from "../component/checkout/DeliveryAddress";
import PaymentMethod from "../component/checkout/PaymentMethod";
import OrderSummary from "../component/checkout/OrderSummary";

import useCart from "../hooks/useCart";
import { buildLoginRedirectUrl } from "../utils/authGuard";

import {
  createCODOrder,
  createRazorpayOrder,
  verifyPayment,
} from "../services/order.service";

const Checkout = () => {
  const navigate = useNavigate();

  const { cart, fetchCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    landmark: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  /* ==========================================================
                          Form Change
  ========================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ==========================================================
                            Cart
  ========================================================== */

  const cartItems = cart?.items || [];

  const subtotal = Number(cart?.totalAmount || 0);

  const shipping = 0;

  // GST 5%
  const tax = Math.round(subtotal * 0.05);

  const total = subtotal + shipping + tax;

  /* ==========================================================
                       Form Validation
  ========================================================== */

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return "Full Name is required.";
    }

    if (!/^[A-Za-z ]{3,50}$/.test(formData.fullName.trim())) {
      return "Please enter a valid full name.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      return "Please enter a valid 10-digit mobile number.";
    }

    if (!formData.addressLine1.trim()) {
      return "Address is required.";
    }

    if (!formData.city.trim()) {
      return "City is required.";
    }

    if (!/^[A-Za-z ]+$/.test(formData.city.trim())) {
      return "Please enter a valid city.";
    }

    if (!formData.state.trim()) {
      return "State is required.";
    }

    if (!/^[A-Za-z ]+$/.test(formData.state.trim())) {
      return "Please enter a valid state.";
    }

    if (!/^\d{6}$/.test(formData.postalCode.trim())) {
      return "Please enter a valid 6-digit PIN code.";
    }

    return null;
  };

  /* ==========================================================
                        Place Order
  ========================================================== */

  const handlePlaceOrder = async () => {
    console.log("🔵 Place Order clicked");

    /* -------------------- Login Check -------------------- */

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("❌ User is not logged in.");

      toast.error("Please log in to continue.");

      navigate(buildLoginRedirectUrl());

      return;
    }

    /* -------------------- Loading Check -------------------- */

    if (loading) {
      console.log("⏳ Order request already in progress.");
      return;
    }

    /* -------------------- Cart Check -------------------- */

    if (cartItems.length === 0) {
      console.error("❌ Cart is empty.");
      toast.error("Your cart is empty.");
      return;
    }

    /* -------------------- Form Validation -------------------- */

    const error = validateForm();

    if (error) {
      console.error("❌ Form validation failed:", error);
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      /* ======================================================
                              COD
      ====================================================== */

      if (paymentMethod === "COD") {
        console.log("🟢 Creating COD order...");

        const response = await createCODOrder({
          shippingAddress: formData,
        });

        console.log("✅ COD Order Response:", response);

        await fetchCart();

        console.log("✅ COD order placed successfully.");

        toast.success("Order placed successfully.");

        navigate("/orders");

        return;
      }

      /* ======================================================
                           RAZORPAY
      ====================================================== */

      if (paymentMethod === "RAZORPAY") {
        console.log("🔵 Creating Razorpay order...");

        /*
         * IMPORTANT:
         *
         * createRazorpayOrder() ka exact return shape
         * different ho sakta hai depending on order.service.js.
         *
         * Isliye yahan multiple possible shapes handle
         * kar rahe hain.
         */

        const razorpayResponse = await createRazorpayOrder();

        console.log(
          "✅ Razorpay Backend Full Response:",
          razorpayResponse,
        );

        /*
         * Possible response shapes:
         *
         * 1. Axios response:
         *    {
         *      data: {
         *        data: {
         *          orderId,
         *          amount,
         *          currency,
         *          key
         *        }
         *      }
         *    }
         *
         * 2. response.data:
         *    {
         *      data: {
         *        orderId,
         *        amount,
         *        currency,
         *        key
         *      }
         *    }
         *
         * 3. Direct:
         *    {
         *      orderId,
         *      amount,
         *      currency,
         *      key
         *    }
         */

        const razorpayOrderData =
          razorpayResponse?.data?.data ||
          razorpayResponse?.data ||
          razorpayResponse;

        console.log(
          "✅ Razorpay Order Data:",
          razorpayOrderData,
        );

        /* -------------------- Validate Razorpay Response -------------------- */

        if (
          !razorpayOrderData ||
          !razorpayOrderData.orderId ||
          !razorpayOrderData.amount ||
          !razorpayOrderData.key
        ) {
          console.error(
            "❌ Invalid Razorpay order response:",
            razorpayResponse,
          );

          throw new Error(
            "Invalid Razorpay order response from backend.",
          );
        }

        console.log("💰 Razorpay Amount:", razorpayOrderData.amount);
        console.log(
          "💰 Frontend Total including GST:",
          total,
        );

        /* ======================================================
                        Razorpay Checkout Options
        ====================================================== */

        const options = {
          key: razorpayOrderData.key,

          amount: razorpayOrderData.amount,

          currency: razorpayOrderData.currency || "INR",

          order_id: razorpayOrderData.orderId,

          name: "WonderFox",

          description: "WonderFox Order Payment",

          prefill: {
            name: formData.fullName,
            contact: formData.phone,
          },

          theme: {
            color: "#FF9500",
          },

          handler: async (response) => {
            console.log(
              "💳 Razorpay Payment Response:",
              response,
            );

            try {
              console.log("🔵 Verifying Razorpay payment...");

              const verifyResult = await verifyPayment({
                razorpayOrderId:
                  response.razorpay_order_id,

                razorpayPaymentId:
                  response.razorpay_payment_id,

                razorpaySignature:
                  response.razorpay_signature,

                shippingAddress: formData,
              });

              console.log(
                "✅ Payment Verified Successfully:",
                verifyResult,
              );

              await fetchCart();

              console.log(
                "✅ Cart refreshed after successful payment.",
              );

              toast.success(
                "Payment successful! Order placed.",
              );

              navigate("/orders");
            } catch (verificationError) {
              console.error(
                "❌ PAYMENT VERIFICATION FAILED",
              );

              console.error(
                "❌ Error:",
                verificationError,
              );

              console.error(
                "❌ Response:",
                verificationError?.response,
              );

              console.error(
                "❌ Response Data:",
                verificationError?.response?.data,
              );

              console.error(
                "❌ Status:",
                verificationError?.response?.status,
              );

              /*
               * As requested:
               * error notification ki jagah console.
               */

              console.error(
                "❌ Payment verification failed. Check the logs above.",
              );
            }
          },

          modal: {
            ondismiss: () => {
              console.log(
                "⚠️ Razorpay payment window closed by user.",
              );
            },
          },
        };

        /* ======================================================
                        Load Razorpay
        ====================================================== */

        if (
          typeof window === "undefined" ||
          !window.Razorpay
        ) {
          console.error(
            "❌ Razorpay script is not loaded.",
          );

          throw new Error(
            "Razorpay script not loaded.",
          );
        }

        console.log(
          "🟢 Opening Razorpay Checkout...",
        );

        const razorpay = new window.Razorpay(options);

        razorpay.on(
          "payment.failed",
          (response) => {
            console.error(
              "❌ Razorpay Payment Failed:",
              response,
            );
          },
        );

        razorpay.open();

        return;
      }

      console.error(
        "❌ Invalid payment method:",
        paymentMethod,
      );
    } catch (error) {
      /* ======================================================
                            ERROR LOGGING
      ====================================================== */

      console.error(
        "❌ FAILED TO PLACE ORDER",
      );

      console.error(
        "❌ Error:",
        error,
      );

      console.error(
        "❌ Response:",
        error?.response,
      );

      console.error(
        "❌ Response Data:",
        error?.response?.data,
      );

      console.error(
        "❌ Status:",
        error?.response?.status,
      );

      console.error(
        "❌ Message:",
        error?.response?.data?.message ||
          error?.message,
      );

      /*
       * Intentionally no toast here.
       * Error console mein milega.
       */
    } finally {
      setLoading(false);

      console.log(
        "🔵 Place order process finished.",
      );
    }
  };

  /* ==========================================================
                        Empty Cart
  ========================================================== */

  if (cartItems.length === 0) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            Your Cart is Empty
          </h2>

          <p className="mt-3 text-gray-500">
            Add some products before checkout.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  /* ==========================================================
                           Checkout UI
  ========================================================== */

  return (
    <section className="min-h-screen bg-[#FFF8F3] py-10">
      <div className="mx-auto max-w-7xl px-5">

        <h1 className="mb-10 text-4xl font-bold text-gray-800">
          Checkout
        </h1>

        <CheckoutStepper />

        <div className="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">

          {/* LEFT */}
          <div>
            <DeliveryAddress
              formData={formData}
              onChange={handleChange}
            />

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>

          {/* RIGHT */}
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            loading={loading}
            paymentMethod={paymentMethod}
            onPlaceOrder={handlePlaceOrder}
          />

        </div>
      </div>
    </section>
  );
};

export default Checkout;