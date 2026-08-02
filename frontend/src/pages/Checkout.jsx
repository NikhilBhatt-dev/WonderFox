import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import CheckoutStepper from "../component/checkout/CheckoutStepper";
import DeliveryAddress from "../component/checkout/DeliveryAddress";
import PaymentMethod from "../component/checkout/PaymentMethod";
import OrderSummary from "../component/checkout/OrderSummary";

const cartItems = [
    {
        id: 1,
        name: "Cute Teddy Bear",
        qty: 1,
        price: 899,
        image:
            "https://images.unsplash.com/photo-1563901935883-cb0f5be8d6f6?w=200",
    },
    {
        id: 2,
        name: "Baby Fox Plush",
        qty: 2,
        price: 1199,
        image:
            "https://images.unsplash.com/photo-1615486363973-f79c4c1c8f5d?w=200",
    },
];

const Checkout = () => {

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

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const shipping = subtotal > 2000 ? 0 : 99;

    const tax = Math.round(subtotal * 0.05);

    const total = subtotal + shipping + tax;

    const handlePlaceOrder = () => {

        console.log(formData);

        console.log(paymentMethod);

    };

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
                        onPlaceOrder={handlePlaceOrder}
                    />

                </div>

            </div>

        </section>

    );

};

export default Checkout;