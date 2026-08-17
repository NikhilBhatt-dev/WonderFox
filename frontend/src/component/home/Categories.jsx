import { useEffect, useState } from "react";
import { ArrowRight, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import { getCategories } from "../../services/category.service";





const Categories = () => {

   

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                setLoading(true);


               
                const data = await getCategories();

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
                            Shop by Category
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

                        <ArrowRight
                            size={18}
                            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />

                    </Link>

                </div>


                {/* Loading */}

                {loading && (

                    <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">

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

                        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">

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

                                    <Link to={`/collection?category=${category._id}`} className="group block text-center">
                                        <div className="mx-auto aspect-square max-w-[170px] overflow-hidden rounded-full border-4 border-[#FFF8F3] bg-[#F7F4F0] p-2 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-orange-100 group-hover:shadow-lg">

                                            {category.image ? (

                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                                />

                                            ) : (

                                                <div className="flex h-full items-center justify-center rounded-full text-gray-400">
                                                    No Image
                                                </div>

                                            )}

                                        </div>


                                        <h3 className="mt-4 text-base font-bold text-gray-900 transition group-hover:text-orange-500">{category.name}</h3>
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
