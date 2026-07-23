import Container from "../component/common/Container";
import products from "../data/Products";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
    return (
        <section className="bg-[#FFF8F3] py-20">

            <Container>

                {/* Heading */}

                <div className="mb-14 text-center">

                    <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-500">
                        MY Favorites
                    </span>

                    <h1 className="mt-5 text-5xl font-black text-gray-900">
                        My Wishlist
                    </h1>

                    <p className="mt-4 text-lg text-gray-500">
                        Save your favorite toys and buy them anytime.
                    </p>

                </div>

                {/* Products */}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {products.map((product) => (

                        <div
                            key={product.id}
                            className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >

                            {/* Image */}

                            <div className="relative overflow-hidden bg-[#FFF8F3]">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-72 w-full object-contain p-8 transition duration-500 group-hover:scale-110"
                                />

                                {/* Wishlist */}

                                <button className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md">

                                    <Heart
                                        size={20}
                                        fill="#FF7A45"
                                        className="text-[#FF7A45]"
                                    />

                                </button>

                            </div>

                            {/* Content */}

                            <div className="p-6">

                                <div className="mb-3 flex items-center gap-1 text-yellow-400">

                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill="currentColor"
                                        />
                                    ))}

                                    <span className="ml-2 text-sm text-gray-500">
                                        (4.9)
                                    </span>

                                </div>

                                <h3 className="text-2xl font-bold text-gray-900">
                                    {product.name}
                                </h3>

                                <p className="mt-2 text-xl font-bold text-orange-500">
                                    ₹{product.price}
                                </p>

                                <div className="mt-6 flex gap-3">

                                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600">

                                        <ShoppingBag size={18} />

                                        Add to Cart

                                    </button>

                                    <Link
                                        to={`/product/${product.id}`}
                                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-gray-100"
                                    >

                                        <Eye size={20} />

                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </Container>

        </section>
    );
};

export default Wishlist;