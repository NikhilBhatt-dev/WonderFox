import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";

import Button from "../component/ui/Button";

const OrderSuccess = () => {

    return (

        <section className="flex min-h-screen items-center justify-center bg-background px-5">

            <div className="w-full max-w-xl rounded-card bg-surface p-10 text-center shadow-card">

                <CheckCircle2
                    size={90}
                    className="mx-auto text-green-500"
                />

                <h1 className="mt-6 text-4xl font-bold text-heading">

                    Order Placed Successfully!

                </h1>

                <p className="mt-4 leading-7 text-body">

                    Thank you for shopping with WonderFox.

                    <br />

                    Your order has been received and is now waiting for confirmation.

                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                    <Link
                        to="/orders"
                        className="flex-1"
                    >

                        <Button className="w-full">

                            <ShoppingBag size={20} />

                            My Orders

                        </Button>

                    </Link>

                    <Link
                        to="/collection"
                        className="flex-1"
                    >

                        <Button
                            variant="outline"
                            className="w-full"
                        >

                            Continue Shopping

                        </Button>

                    </Link>

                </div>

            </div>

        </section>

    );

};

export default OrderSuccess;