import { ArrowRight, Star, Truck, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Container from "../common/Container";

import heroImage from "../../assets/image/toy-3.avif";

const Hero = () => {
    return (
        <section className="overflow-hidden bg-[#FFF8F3]">

            <Container>

                <div className="grid min-h-[680px] items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">

                    {/* LEFT CONTENT */}

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-xl"
                    >

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">

                            <Star
                                size={16}
                                className="fill-orange-400 text-orange-400"
                            />

                            Premium toys for little moments

                        </div>

                        <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">

                            Premium toys.

                            <span className="block text-orange-500">

                                Timeless joy.

                            </span>

                        </h1>

                        <p className="mt-7 max-w-lg text-lg leading-8 text-gray-600">

                            Thoughtfully chosen toys made for play,
                            learning and memories that last. Discover
                            something special for every little one.

                        </p>

                        {/* BUTTONS */}

                        <div className="mt-9 flex flex-wrap gap-4">

                            <Link
                                to="/collection"
                                className="group inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-7 py-4 font-semibold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600"
                            >

                                Shop Collection

                                <ArrowRight
                                    size={19}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />

                            </Link>

                            <Link
                                to="/about"
                                className="inline-flex items-center rounded-2xl border border-gray-200 bg-white px-7 py-4 font-semibold text-gray-800 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:text-orange-500"
                            >

                                Our Story

                            </Link>

                        </div>

                        {/* TRUST FEATURES */}

                        <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-gray-200 pt-7">

                            <div className="flex items-start gap-3">

                                <div className="rounded-xl bg-orange-100 p-2">

                                    <Truck
                                        size={18}
                                        className="text-orange-500"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-gray-800">
                                        Fast Delivery
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Across India
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-start gap-3">

                                <div className="rounded-xl bg-green-100 p-2">

                                    <ShieldCheck
                                        size={18}
                                        className="text-green-600"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-gray-800">
                                        Safe & Trusted
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Quality products
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-start gap-3">

                                <div className="rounded-xl bg-yellow-100 p-2">

                                    <Star
                                        size={18}
                                        className="fill-yellow-500 text-yellow-500"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-gray-800">
                                        Loved by Kids
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Made for joy
                                    </p>

                                </div>

                            </div>

                        </div>

                    </motion.div>


                    {/* RIGHT IMAGE */}

                    

                        {/* Background Shape */}

                       
                        {/* Product Card */}

                     

                            <div className="overflow-hidden rounded-[3rem] border border-white bg-white p-4 shadow-2xl shadow-gray-200/80">

                                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#F7EDE5]">

                                    <img
                                        src={heroImage}
                                        alt="WonderFox premium toy"
                                        className="h-[480px] w-full object-cover"
                                    />

                                    {/* Floating Rating */}

                                   

                                       

                                 

                                    {/* Product Label */}

                                    <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur">

                                        <div>

                                            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                                WonderFox
                                            </p>

                                            <h3 className="mt-1 font-bold text-gray-900">
                                                Made for little moments
                                            </h3>

                                        </div>

                                        <div className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold text-white">
                                            Explore
                                        </div>

                                    </div>

                                </div>

                            </div>

                       

                    
                </div>

            </Container>

        </section>
    );
};

export default Hero;