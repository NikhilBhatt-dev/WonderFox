import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import categories from "../../data/categories";

import Container from "../common/Container";

const Categories = () => {

    return (

        <section className="bg-white py-20">

            <Container>

                {/* Heading */}

                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

                    <div>

                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                            Explore
                        </p>

                        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Shop by Collection
                        </h2>

                        <p className="mt-4 max-w-xl text-gray-500">
                            Discover thoughtfully selected toys made for
                            different interests, ages and moments of play.
                        </p>

                    </div>

                    <Link
                        to="/collection"
                        className="group inline-flex w-fit items-center gap-2 font-semibold text-gray-800 transition hover:text-orange-500"
                    >

                        View all

                        <ArrowUpRight
                            size={18}
                            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />

                    </Link>

                </div>


                {/* Categories */}

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {categories.map((category, index) => (

                        <motion.div
                            key={category.id}
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.08,
                            }}
                        >

                            <Link
                                to={`/collection?category=${category.slug || category.id}`}
                                className="group relative block overflow-hidden rounded-[2rem] bg-[#F7F4F0]"
                            >

                                {/* Image */}

                                <div className="aspect-[1.15/1] overflow-hidden">

                                    <img
                                        src={
                                            category.image ||
                                            category.images?.[0]?.url
                                        }
                                        alt={category.name}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                    />

                                </div>


                                {/* Overlay */}

                                <div className="absolute inset-x-0 bottom-0 p-5">

                                    <div className="flex items-center justify-between rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur">

                                        <div>

                                            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                                Collection
                                            </p>

                                            <h3 className="mt-1 text-lg font-bold text-gray-900">
                                                {category.name}
                                            </h3>

                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white transition duration-300 group-hover:bg-orange-500">

                                            <ArrowUpRight size={18} />

                                        </div>

                                    </div>

                                </div>

                            </Link>

                        </motion.div>

                    ))}

                </div>

            </Container>

        </section>
    );
};

export default Categories;