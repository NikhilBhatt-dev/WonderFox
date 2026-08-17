import { Link } from "react-router-dom";
import { ArrowRight, Heart, Star } from "lucide-react";
import heroBG from "../../assets/image/about.webp"

const AboutHero = () => {
    return (
        <section className="overflow-hidden bg-[#FAF5EC] py-12 sm:py-20 lg:py-28">
            <div className="container mx-auto px-5">

                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

                    {/* LEFT CONTENT */}

                    <div>

                        <span className="inline-flex items-center rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
                            About WonderFox
                        </span>

                        <h1 className="mt-6 text-4xl font-black leading-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                            Bringing Joy
                            <br />
                            To Every
                            <br />
                            Child.
                        </h1>

                        <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
                            At WonderFox, we believe every toy should inspire imagination,
                            create unforgettable childhood memories, and bring endless
                            smiles. Our mission is to offer carefully selected toys that
                            parents trust and children truly love.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link
                                to="/products"
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF7A45] px-6 py-4 font-semibold text-white transition hover:scale-105 sm:w-auto sm:px-8"
                            >
                                Explore Collection
                                <ArrowRight size={20} />
                            </Link>

                            <Link
                                to="/contact"
                            className="w-full rounded-full border border-gray-300 px-6 py-4 text-center font-semibold text-gray-700 transition hover:bg-white sm:w-auto sm:px-8"
                            >
                                Contact Us
                            </Link>

                        </div>

                        {/* TRUST POINTS */}

                        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3 md:gap-8">

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                    Premium
                                </h3>

                                <p className="text-gray-500">
                                    Quality Toys
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                    Child
                                </h3>

                                <p className="text-gray-500">
                                    Safe Materials
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                    Fast
                                </h3>

                                <p className="text-gray-500">
                                    Delivery
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* RIGHT IMAGE */}

                    <div className="relative mt-4 sm:mt-10 lg:mt-0">
                        <div className="relative overflow-hidden rounded-[32px] bg-white shadow-2xl lg:-translate-y-10 lg:rounded-[40px]">
                            <img
                                src={heroBG}
                                alt="WonderFox Toys"
                                className="aspect-[4/5] w-full object-cover lg:h-[780px] lg:aspect-auto"
                            />
                        </div>
                    
                       

                        {/* Floating Card */}

                        <div className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-3xl bg-white p-3 shadow-xl sm:bottom-10 sm:-left-6 sm:max-w-none sm:p-6">

                            <div className="flex items-center gap-3">

                                <Heart
                                    className="text-[#FF7A45]"
                                    fill="#FF7A45"
                                />

                                <div >
                                    <h4 className="font-bold text-gray-800">
                                        Loved by Families
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                        Safe • Soft • Premium
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Floating Star */}

                        <div className="absolute right-3 top-3 rounded-full bg-white p-3 shadow-lg sm:-right-5 sm:top-10 sm:p-4">

                            <Star
                                className="text-yellow-500"
                                fill="#FACC15"
                            />

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default AboutHero;
