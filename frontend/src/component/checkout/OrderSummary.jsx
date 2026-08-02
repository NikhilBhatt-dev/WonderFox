import { ShieldCheck, Truck, Tag } from "lucide-react";

const OrderSummary = ({
    cartItems,
    subtotal,
    shipping,
    tax,
    total,
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
                        key={item.id}
                        className="flex items-center gap-4"
                    >

                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 rounded-2xl object-cover border"
                        />

                        <div className="flex-1">

                            <h3 className="font-semibold text-gray-800">
                                {item.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                                Qty : {item.qty}
                            </p>

                        </div>

                        <p className="font-bold">
                            ₹{item.price * item.qty}
                        </p>

                    </div>

                ))}

            </div>

            <div className="my-8 border-y py-6 space-y-4">

                <div className="flex justify-between">

                    <span>Subtotal</span>

                    <span>₹{subtotal}</span>

                </div>

                <div className="flex justify-between">

                    <span>Shipping</span>

                    <span>

                        {shipping === 0
                            ? "Free"
                            : `₹${shipping}`}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>Tax</span>

                    <span>₹{tax}</span>

                </div>

            </div>

            <div className="mb-8 flex items-center justify-between">

                <h3 className="text-xl font-bold">
                    Total
                </h3>

                <h3 className="text-2xl font-bold text-orange-500">
                    ₹{total}
                </h3>

            </div>

            <button
                onClick={onPlaceOrder}
                className="w-full rounded-2xl bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600"
            >
                🔒 Place Secure Order
            </button>

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