import { useEffect, useState } from "react";
import { ArrowUpRight, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import { getCategories } from "../../services/category.service";





const Categories = () => {

    console.log("🔥 CATEGORIES COMPONENT IS RUNNING");

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                setLoading(true);


               
                const data = await getCategories();

                console.log("LIVE CATEGORIES:", data);

                setCategories(data || []);

            } catch (err) {

                console.error(
                    "Failed to load categories:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Failed to load categories."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchCategories();

    }, []);


    return (

        <section className="bg-white py-20">

            <Container>

                {/* Header */}

                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

                    <div>

                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                            Explore
                        </p>

                        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Shop by Collection
                        </h2>

                        <p className="mt-4 max-w-xl text-gray-500">
                            Discover thoughtfully selected toys made
                            for different interests, ages and moments
                            of play.
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


                {/* Loading */}

                {loading && (

                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        {[1, 2, 3, 4].map((item) => (

                            <div
                                key={item}
                                className="overflow-hidden rounded-[2rem] bg-gray-100"
                            >

                                <div className="aspect-[1.15/1] animate-pulse bg-gray-200" />

                            </div>

                        ))}

                    </div>

                )}


                {/* Error */}

                {!loading && error && (

                    <div className="mt-12 flex flex-col items-center justify-center rounded-3xl bg-gray-50 px-6 py-16 text-center">

                        <PackageOpen
                            size={45}
                            className="text-gray-400"
                        />

                        <h3 className="mt-5 text-xl font-bold text-gray-800">
                            Categories unavailable
                        </h3>

                        <p className="mt-2 text-gray-500">
                            {error}
                        </p>

                    </div>

                )}


                {/* Empty */}

                {!loading &&
                    !error &&
                    categories.length === 0 && (

                        <div className="mt-12 flex flex-col items-center justify-center rounded-3xl bg-gray-50 px-6 py-16 text-center">

                            <PackageOpen
                                size={45}
                                className="text-gray-400"
                            />

                            <h3 className="mt-5 text-xl font-bold text-gray-800">
                                No collections available
                            </h3>

                            <p className="mt-2 text-gray-500">
                                Collections will appear here soon.
                            </p>

                        </div>

                    )}


                {/* LIVE CATEGORIES */}

                {!loading &&
                    !error &&
                    categories.length > 0 && (

                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                            {categories.map((category, index) => (

                                <motion.div
                                    key={category._id}
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
                                        to={`/collection?category=${category._id}`}
                                        className="group relative block overflow-hidden rounded-[2rem] bg-[#F7F4F0]"
                                    >

                                        {/* Image */}

                                        <div className="aspect-[1.15/1] overflow-hidden">

                                            {category.image ? (

                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                                />

                                            ) : (

                                                <div className="flex h-full items-center justify-center text-gray-400">
                                                    No Image
                                                </div>

                                            )}

                                        </div>


                                        {/* Bottom Info */}

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

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white transition duration-300 group-hover:bg-orange-500">

                                                    <ArrowUpRight
                                                        size={18}
                                                    />

                                                </div>

                                            </div>

                                        </div>

                                    </Link>

                                </motion.div>

                            ))}

                        </div>

                    )}

            </Container>

        </section>

    );

};

export default Categories;