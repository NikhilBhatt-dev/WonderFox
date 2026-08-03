import { ShieldCheck, Truck, Tag } from "lucide-react";

import Button from "../ui/Button";

const OrderSummary = ({
    cartItems,
    subtotal,
    shipping,
    tax,
    total,
    loading,
    onPlaceOrder,
}) => {

    return (

        <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-lg">

            <h2 className="mb-6 text-2xl font-bold text-gray-800">

                Order Summary

            </h2>

            <div className="space-y-5">

                {cartItems.map((item) => (

                    <div
                        key={item.product._id}
                        className="flex items-center gap-4"
                    >

                        <img
                            src={item.product.images?.[0]?.url}
                            alt={item.product.name}
                            className="h-20 w-20 rounded-2xl border object-cover"
                        />

                        <div className="flex-1">

                            <h3 className="font-semibold text-gray-800">

                                {item.product.name}

                            </h3>

                            <p className="text-sm text-gray-500">

                                Qty : {item.quantity}

                            </p>

                        </div>

                        <p className="font-bold">

                            ₹{item.price * item.quantity}

                        </p>

                    </div>

                ))}

            </div>

            <div className="my-8 space-y-4 border-y py-6">

                <div className="flex justify-between">

                    <span>

                        Subtotal

                    </span>

                    <span>

                        ₹{subtotal}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>

                        Shipping

                    </span>

                    <span className="text-green-600">

                        {shipping === 0 ? "FREE" : `₹${shipping}`}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>

                        GST (5%)

                    </span>

                    <span>

                        ₹{tax}

                    </span>

                </div>

            </div>

            <div className="mb-8 flex items-center justify-between">

                <h3 className="text-xl font-bold">

                    Grand Total

                </h3>

                <h3 className="text-2xl font-bold text-orange-500">

                    ₹{total}

                </h3>

            </div>

            <Button
                onClick={onPlaceOrder}
                disabled={loading}
                className="w-full"
            >

                {loading
                    ? "Placing Order..."
                    : "🔒 Place Secure Order"}

            </Button>

            <div className="mt-8 space-y-4 text-sm">

                <div className="flex items-center gap-3">

                    <ShieldCheck
                        size={18}
                        className="text-green-600"
                    />

                    <span>

                        100% Secure Checkout

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <Truck
                        size={18}
                        className="text-blue-600"
                    />

                    <span>

                        Fast Delivery Across India

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <Tag
                        size={18}
                        className="text-orange-500"
                    />

                    <span>

                        Easy Returns Available

                    </span>

                </div>

            </div>

        </div>

    );

};

export default OrderSummary;