import { Link } from "react-router-dom";
import { ShieldCheck, Truck, BadgePercent } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

const CartSummary = ({ subtotal }) => {

    const shipping = 0;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + tax;

    return (

        <Card className="sticky top-24">

            <h2 className="mb-6 text-2xl font-bold text-heading">
                Order Summary
            </h2>

            <div className="space-y-4">

                <div className="flex justify-between">
                    <span className="text-body">Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-body">Shipping</span>
                    <span className="text-green-600">Free</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-body">Tax</span>
                    <span>₹{tax}</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{total}</span>
                </div>

            </div>

            <Link to="/checkout" className="block mt-8">

                <Button className="w-full">
                    Proceed to Checkout
                </Button>

            </Link>

            <div className="mt-8 space-y-4 text-sm">

                <div className="flex items-center gap-3">
                    <ShieldCheck className="text-accent" size={18} />
                    <span>100% Secure Checkout</span>
                </div>

                <div className="flex items-center gap-3">
                    <Truck className="text-primary" size={18} />
                    <span>Fast Delivery</span>
                </div>

                <div className="flex items-center gap-3">
                    <BadgePercent className="text-secondary" size={18} />
                    <span>Best Price Guaranteed</span>
                </div>

            </div>

        </Card>

    );

};

export default CartSummary;