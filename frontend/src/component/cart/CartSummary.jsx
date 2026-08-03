import { Link } from "react-router-dom";
import {
    ShieldCheck,
    Truck,
    BadgePercent,
    ShoppingBag,
} from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

const CartSummary = ({ subtotal }) => {

    const shipping = 0;

    const tax = Math.round(subtotal * 0.05);

    const total = subtotal + shipping + tax;

    const isEmpty = subtotal <= 0;

    return (

        <Card className="sticky top-24">

            <div className="flex items-center gap-3 mb-6">

                <ShoppingBag className="text-primary" />

                <h2 className="text-2xl font-bold text-heading">

                    Order Summary

                </h2>

            </div>

            <div className="space-y-5">

                <div className="flex justify-between">

                    <span className="text-body">

                        Subtotal

                    </span>

                    <span className="font-semibold">

                        ₹{subtotal}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-body">

                        Shipping

                    </span>

                    <span className="font-semibold text-green-600">

                        FREE

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-body">

                        GST (5%)

                    </span>

                    <span className="font-semibold">

                        ₹{tax}

                    </span>

                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between text-xl font-bold">

                    <span>

                        Grand Total

                    </span>

                    <span className="text-primary">

                        ₹{total}

                    </span>

                </div>

            </div>

            <Link
                to="/checkout"
                className="mt-8 block"
            >

                <Button
                    className="w-full"
                    disabled={isEmpty}
                >

                    Proceed to Checkout

                </Button>

            </Link>

            <div className="mt-8 space-y-4 text-sm">

                <div className="flex items-center gap-3">

                    <ShieldCheck
                        size={18}
                        className="text-accent"
                    />

                    <span>

                        100% Secure Checkout

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <Truck
                        size={18}
                        className="text-primary"
                    />

                    <span>

                        Fast Delivery Across India

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <BadgePercent
                        size={18}
                        className="text-secondary"
                    />

                    <span>

                        Best Price Guaranteed

                    </span>

                </div>

            </div>

        </Card>

    );

};

export default CartSummary;