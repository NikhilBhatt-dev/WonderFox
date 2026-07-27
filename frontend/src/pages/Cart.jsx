import products from "../data/Products";
import Container from "../component/common/Container";
import { Link } from "react-router-dom";

const Cart = () => {

    const cartItems = products.slice(0, 2);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price,
        0
    );

    return (
        <section className="bg-[#FFF8F3] py-16">

            <Container>

                {/* Header */}

                <div className="mb-12 text-center">

                    <h1 className="text-4xl font-bold text-gray-800">
                        Shopping Cart
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Review your selected products.
                    </p>

                </div>

                <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

                    {/* Left */}

                    <div className="space-y-6">

                        {cartItems.map((item) => (

                            <div
                                key={item.id}
                                className="flex flex-col gap-5 rounded-3xl bg-white p-5 shadow-md md:flex-row md:items-center"
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-36 w-36 rounded-2xl bg-[#FFF8F3] object-contain p-3"
                                />

                                <div className="flex-1">

                                    <h2 className="text-2xl font-semibold">
                                        {item.name}
                                    </h2>

                                    <p className="mt-2 text-orange-500 font-bold">
                                        ₹{item.price}
                                    </p>

                                </div>

                                <div className="flex items-center gap-3">

                                    <button className="h-10 w-10 rounded-xl border">
                                        -
                                    </button>

                                    <span>1</span>

                                    <button className="h-10 w-10 rounded-xl border">
                                        +
                                    </button>

                                </div>

                                <button className="rounded-xl bg-red-500 px-5 py-2 text-white">
                                    Remove
                                </button>

                            </div>

                        ))}

                    </div>

                    {/* Right */}

                    <div className="h-fit rounded-3xl bg-white p-6 shadow-md">

                        <h2 className="text-2xl font-bold">
                            Order Summary
                        </h2>

                        <div className="mt-8 space-y-4">

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>

                            <hr />

                            <div className="flex justify-between text-xl font-bold">

                                <span>Total</span>

                                <span>
                                    ₹{subtotal}
                                </span>

                            </div>

                        </div>

                        <Link to="/checkout">
                        <button className="mt-8 w-full rounded-2xl bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600">
                            Proceed to Checkout
                          
                          
                        </button>
                        </Link>

                    </div>

                </div>

            </Container>

        </section>
    );
};

export default Cart;