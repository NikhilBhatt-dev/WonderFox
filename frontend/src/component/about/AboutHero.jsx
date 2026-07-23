import { Link } from "react-router-dom";
import { ArrowRight, Heart, Star } from "lucide-react";
import heroBg from "../../assets/image/about-hero-removebg-preview.png";
import heroBG from "../../assets/image/about.webp"

const AboutHero = () => {
    return (
        <section className="bg-[#FAF5EC] py-20 lg:py-28 overflow-hidden">
            <div className="container mx-auto px-5">

                <div className="grid lg:grid-cols-2 items-center gap-16">

                    {/* LEFT CONTENT */}

                    <div>

                        <span className="inline-flex items-center rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
                            About WonderFox
                        </span>

                        <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-gray-900">
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
                                className="flex items-center gap-2 rounded-full bg-[#FF7A45] px-8 py-4 font-semibold text-white transition hover:scale-105"
                            >
                                Explore Collection
                                <ArrowRight size={20} />
                            </Link>

                            <Link
                                to="/contact"
                                className="rounded-full border border-gray-300 px-8 py-4 font-semibold text-gray-700 transition hover:bg-white"
                            >
                                Contact Us
                            </Link>

                        </div>

                        {/* TRUST POINTS */}

                        <div className="mt-14 flex flex-wrap gap-8">

                            <div>
                                <h3 className="text-3xl font-bold text-gray-900">
                                    Premium
                                </h3>

                                <p className="text-gray-500">
                                    Quality Toys
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold text-gray-900">
                                    Child
                                </h3>

                                <p className="text-gray-500">
                                    Safe Materials
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold text-gray-900">
                                    Fast
                                </h3>

                                <p className="text-gray-500">
                                    Delivery
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* RIGHT IMAGE */}

                    <div className="relative">
                        <div className="relative -translate-y-10 overflow-hidden rounded-[40px] bg-white shadow-2xl">
                            <img
                                src={heroBG}
                                alt="WonderFox Toys"
                                className="h-[780px] w-full object-cover"
                            />
                        </div>
                    
                       

                        {/* Floating Card */}

                        <div className="absolute -left-6 bottom-10 rounded-3xl bg-white p-6 shadow-xl">

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

                        <div className="absolute -right-5 top-10 rounded-full bg-white p-4 shadow-lg">

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