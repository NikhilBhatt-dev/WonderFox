import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    CreditCard,
    Truck,
    MapPin,
    User,
    Mail,
    Phone,
} from "lucide-react";

const cartItems = [
    {
        id: 1,
        name: "Cute Teddy Bear",
        price: 899,
        qty: 1,
        image:
            "https://images.unsplash.com/photo-1563901935883-cb0f5be8d6f6?w=200",
    },
    {
        id: 2,
        name: "Baby Fox Plush",
        price: 1199,
        qty: 2,
        image:
            "https://images.unsplash.com/photo-1615486363973-f79c4c1c8f5d?w=200",
    },
];

export default function Checkout() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        payment: "cod",
    });

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const shipping = subtotal > 2000 ? 0 : 99;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + tax;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Order Placed Successfully 🎉");
    };

    return (
        <section className="min-h-screen bg-[#FFF8F3] py-10">
            <div className="mx-auto max-w-7xl px-5">

                {/* Breadcrumb */}

                <Link
                    to="/cart"
                    className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-orange-500"
                >
                    <ArrowLeft size={18} />
                    Back to Cart
                </Link>

                <h1 className="mb-10 text-4xl font-bold text-gray-800">
                    Checkout
                </h1>

                <div className="grid gap-10 lg:grid-cols-3">

                    {/* LEFT */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-8 lg:col-span-2"
                    >
                        {/* Billing */}

                        <div className="rounded-3xl bg-white p-8 shadow-lg">

                            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">

                                <User className="text-orange-500" />

                                Billing Details

                            </h2>

                            <div className="grid gap-5 md:grid-cols-2">

                                <input
                                    required
                                    name="firstName"
                                    placeholder="First Name"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    className="rounded-xl border p-4 outline-none focus:border-orange-400"
                                />

                                <input
                                    required
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    className="rounded-xl border p-4 outline-none focus:border-orange-400"
                                />

                                <div className="relative">

                                    <Mail
                                        size={18}
                                        className="absolute left-4 top-5 text-gray-400"
                                    />

                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border py-4 pl-12 pr-4 outline-none focus:border-orange-400"
                                    />

                                </div>

                                <div className="relative">

                                    <Phone
                                        size={18}
                                        className="absolute left-4 top-5 text-gray-400"
                                    />

                                    <input
                                        required
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border py-4 pl-12 pr-4 outline-none focus:border-orange-400"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Shipping */}

                        <div className="rounded-3xl bg-white p-8 shadow-lg">

                            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">

                                <MapPin className="text-orange-500" />

                                Shipping Address

                            </h2>

                            <div className="space-y-5">

                                <textarea
                                    required
                                    rows="4"
                                    name="address"
                                    placeholder="Street Address"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border p-4 outline-none focus:border-orange-400"
                                />

                                <div className="grid gap-5 md:grid-cols-3">

                                    <input
                                        required
                                        name="city"
                                        placeholder="City"
                                        value={form.city}
                                        onChange={handleChange}
                                        className="rounded-xl border p-4 outline-none focus:border-orange-400"
                                    />

                                    <input
                                        required
                                        name="state"
                                        placeholder="State"
                                        value={form.state}
                                        onChange={handleChange}
                                        className="rounded-xl border p-4 outline-none focus:border-orange-400"
                                    />

                                    <input
                                        required
                                        name="pincode"
                                        placeholder="PIN Code"
                                        value={form.pincode}
                                        onChange={handleChange}
                                        className="rounded-xl border p-4 outline-none focus:border-orange-400"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Payment */}

                        <div className="rounded-3xl bg-white p-8 shadow-lg">

                            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">

                                <CreditCard className="text-orange-500" />

                                Payment Method

                            </h2>

                            <div className="space-y-4">

                                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 hover:border-orange-400">

                                    <input
                                        type="radio"
                                        value="cod"
                                        name="payment"
                                        checked={form.payment === "cod"}
                                        onChange={handleChange}
                                    />

                                    Cash on Delivery

                                </label>

                                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 hover:border-orange-400">

                                    <input
                                        type="radio"
                                        value="razorpay"
                                        name="payment"
                                        checked={form.payment === "razorpay"}
                                        onChange={handleChange}
                                    />

                                    Razorpay

                                </label>

                                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 hover:border-orange-400">

                                    <input
                                        type="radio"
                                        value="stripe"
                                        name="payment"
                                        checked={form.payment === "stripe"}
                                        onChange={handleChange}
                                    />

                                    Stripe

                                </label>

                            </div>

                        </div>

                    </form>

                    {/* RIGHT */}

                    <div className="h-fit rounded-3xl bg-white p-8 shadow-xl lg:sticky lg:top-24">

                        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">

                            <Truck className="text-orange-500" />

                            Order Summary

                        </h2>

                        <div className="space-y-5">

                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-20 w-20 rounded-xl object-cover"
                                    />

                                    <div className="flex-1">

                                        <h3 className="font-semibold">
                                            {item.name}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Qty : {item.qty}
                                        </p>

                                    </div>

                                    <span className="font-bold">
                                        ₹{item.price * item.qty}
                                    </span>

                                </div>
                            ))}

                        </div>

                        <div className="my-8 space-y-3 border-y py-6">

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>
                                    {shipping === 0 ? "Free" : `₹${shipping}`}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>₹{tax}</span>
                            </div>

                        </div>

                        <div className="mb-8 flex justify-between text-2xl font-bold">

                            <span>Total</span>

                            <span className="text-orange-500">
                                ₹{total}
                            </span>

                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full rounded-xl bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600"
                        >
                            Place Order
                        </button>

                    </div>

                </div>

            </div>
        </section>
    );
}