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

        if (!formData.fullName.trim())
            return "Full Name is required.";

        if (!formData.phone.trim())
            return "Phone Number is required.";

        if (!formData.addressLine1.trim())
            return "Address is required.";

        if (!formData.city.trim())
            return "City is required.";

        if (!formData.state.trim())
            return "State is required.";

        if (!formData.postalCode.trim())
            return "Postal Code is required.";

        return null;

    };

    const handlePlaceOrder = async () => {

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

                navigate("/order-success");

                return;

            }

            if (paymentMethod === "RAZORPAY") {

                const razorpayOrder =
                    await createRazorpayOrder();

                console.log(razorpayOrder);

                toast("Razorpay integration is next.");

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

            <section className="min-h-screen flex items-center justify-center">

                <div className="text-center">

                    <h2 className="text-3xl font-bold">

                        Your Cart is Empty

                    </h2>

                    <p className="mt-3 text-gray-500">

                        Add some products before checkout.

                    </p>

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