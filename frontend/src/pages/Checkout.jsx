import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import CheckoutStepper from "../component/checkout/CheckoutStepper";
import DeliveryAddress from "../component/checkout/DeliveryAddress";
import PaymentMethod from "../component/checkout/PaymentMethod";
import OrderSummary from "../component/checkout/OrderSummary";

import useCart from "../hooks/useCart";

import {
    createCODOrder,
    createRazorpayOrder,
} from "../services/order.service";

const Checkout = () => {

    const navigate = useNavigate();

    const {
        cart,
        fetchCart,
    } = useCart();

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

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const cartItems = cart.items || [];

    const subtotal = cart.totalAmount || 0;

    const shipping = 0;

    const tax = Math.round(subtotal * 0.05);

    const total = subtotal + shipping + tax;

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

    const handlePlaceOrder = async () => {

        if (loading) return;

        if (cartItems.length === 0) {
            return toast.error("Your cart is empty.");
        }

        const error = validateForm();

        if (error) {
            return toast.error(error);
        }

        try {

            setLoading(true);

            if (paymentMethod === "COD") {

                await createCODOrder({
                    shippingAddress: formData,
                });

                await fetchCart();

                toast.success("Order placed successfully.");

              
                navigate("/orders");

                return;
            }

            if (paymentMethod === "RAZORPAY") {

                const razorpayOrder =
                    await createRazorpayOrder();

                console.log(razorpayOrder);

                toast("Razorpay integration coming soon.");

                return;

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to place order."
            );

        } finally {

            setLoading(false);

        }

    };

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

    return (

        <section className="min-h-screen bg-[#FFF8F3] py-10">

            <div className="mx-auto max-w-7xl px-5">

                <h1 className="mb-10 text-4xl font-bold text-gray-800">

                    Checkout

                </h1>

                <CheckoutStepper />

                <div className="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">

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