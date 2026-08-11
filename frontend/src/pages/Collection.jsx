import { useEffect, useState } from "react";
import { ArrowUpRight, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";

import Container from "../component/common/Container";
import ProductCard from "../component/common/ProductCard";

import { getCategories } from "../services/category.service";
import { getProducts } from "../services/product.service";

const Collection = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [categoryError, setCategoryError] = useState("");

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [productError, setProductError] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        perPage: 10,
        totalProducts: 0,
    });

    const selectedCategory = searchParams.get("category") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const sort = searchParams.get("sort") || "-createdAt";
    const currentPage = Number(searchParams.get("page") || 1);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data || []);
            } catch (err) {
                console.error(err);
                setCategoryError(
                    err.response?.data?.message ||
                    "Failed to load categories."
                );
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true);
            setProductError("");

            try {
                const params = {
                    sort,
                    page: currentPage,
                };

                if (selectedCategory) {
                    params.category = selectedCategory;
                }

                if (minPrice) {
                    params.minPrice = minPrice;
                }

                if (maxPrice) {
                    params.maxPrice = maxPrice;
                }

                const data = await getProducts(params);
                setProducts(data.products || []);
                setPagination(data.pagination || {
                    currentPage: 1,
                    totalPages: 1,
                    perPage: 10,
                    totalProducts: 0,
                });
            } catch (err) {
                console.error(err);
                setProductError(
                    err.response?.data?.message ||
                    "Failed to load products."
                );
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, [selectedCategory, minPrice, maxPrice, sort, currentPage]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }

        params.delete("page");
        setSearchParams(params);
    };

    const handleCategorySelect = (e) => {
        const category = e.target.value;
        const params = new URLSearchParams(searchParams);

        if (category) {
            params.set("category", category);
        } else {
            params.delete("category");
        }

        params.delete("page");
        setSearchParams(params);
    };

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);

        if (page > 1) {
            params.set("page", page);
        } else {
            params.delete("page");
        }

        setSearchParams(params);
    };

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
                        className="group inline-flex items-center gap-2 font-semibold text-gray-800 hover:text-orange-500"
                    >
                        View all
                        <ArrowUpRight
                            size={18}
                            className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>
                </div>

                {/* Categories */}
                {loadingCategories && (
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="aspect-[1.15/1] animate-pulse rounded-[2rem] bg-gray-200"
                            />
                        ))}
                    </div>
                )}

                {!loadingCategories && categoryError && (
                    <div className="mt-12 rounded-3xl bg-gray-50 p-12 text-center">
                        <PackageOpen
                            size={40}
                            className="mx-auto text-gray-400"
                        />
                        <h3 className="mt-4 text-xl font-bold">
                            Categories unavailable
                        </h3>
                        <p className="mt-2 text-gray-500">{categoryError}</p>
                    </div>
                )}

                {!loadingCategories && !categoryError && categories.length > 0 && (
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category._id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                            >
                                <Link
                                    to={`/collection?${(() => {
                                        const params = new URLSearchParams(searchParams);
                                        params.set("category", category._id);
                                        params.delete("page");
                                        return params.toString();
                                    })()}`}
                                    className="group relative block overflow-hidden rounded-[2rem] bg-[#F7F4F0]"
                                >
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

                                    <div className="absolute inset-x-0 bottom-0 p-5">
                                        <div className="flex items-center justify-between rounded-2xl bg-white/95 px-5 py-4 shadow-lg">
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                                    Collection
                                                </p>
                                                <h3 className="mt-1 text-lg font-bold text-gray-900">
                                                    {category.name}
                                                </h3>
                                            </div>
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white transition group-hover:bg-orange-500">
                                                <ArrowUpRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Product Filters */}
                <div className="mt-20 rounded-3xl border border-gray-200 bg-gray-50 p-6">
                    <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Category filter
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={handleCategorySelect}
                                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-700"
                            >
                                <option value="">All categories</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Min price
                            </label>
                            <input
                                type="number"
                                name="minPrice"
                                value={minPrice}
                                onChange={handleFilterChange}
                                placeholder="₹0"
                                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-700"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Max price
                            </label>
                            <input
                                type="number"
                                name="maxPrice"
                                value={maxPrice}
                                onChange={handleFilterChange}
                                placeholder="₹9999"
                                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-700"
                            />
                        </div>
                    </div>

                    <div className="mt-6 lg:mt-8">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Sort by
                        </label>
                        <select
                            name="sort"
                            value={sort}
                            onChange={handleFilterChange}
                            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-700"
                        >
                            <option value="-createdAt">Newest</option>
                            <option value="createdAt">Oldest</option>
                            <option value="-price">Price: High to Low</option>
                            <option value="price">Price: Low to High</option>
                            <option value="-name">Name: Z to A</option>
                            <option value="name">Name: A to Z</option>
                        </select>
                    </div>
                </div>

                {/* Products */}
                <div className="mt-16">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                                Collection
                            </p>
                            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                Browse Products
                            </h2>
                        </div>

                        {selectedCategory && (
                            <p className="text-sm text-gray-600">
                                Showing category filter: {
                                    categories.find((category) => category._id === selectedCategory)?.name || "Selected"
                                }
                            </p>
                        )}
                    </div>

                    {loadingProducts && (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div
                                    key={item}
                                    className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm"
                                >
                                    <div className="aspect-[4/3] animate-pulse rounded-3xl bg-gray-200" />
                                    <div className="mt-4 space-y-3">
                                        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                                        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                                        <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loadingProducts && productError && (
                        <div className="rounded-3xl bg-gray-50 p-12 text-center">
                            <PackageOpen
                                size={40}
                                className="mx-auto text-gray-400"
                            />
                            <h3 className="mt-4 text-xl font-bold text-gray-900">
                                Products unavailable
                            </h3>
                            <p className="mt-2 text-gray-500">{productError}</p>
                        </div>
                    )}

                    {!loadingProducts && !productError && products.length === 0 && (
                        <div className="rounded-3xl bg-gray-50 p-12 text-center">
                            <PackageOpen
                                size={40}
                                className="mx-auto text-gray-400"
                            />
                            <h3 className="mt-4 text-xl font-bold text-gray-900">
                                No products found
                            </h3>
                            <p className="mt-2 text-gray-500">
                                Try a different filter or clear the category.
                            </p>
                        </div>
                    )}

                    {!loadingProducts && !productError && products.length > 0 && (
                        <>
                            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-gray-600">
                                    Showing {pagination.totalProducts} products · page {pagination.currentPage} of {pagination.totalPages}
                                </p>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage <= 1}
                                        className="rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage >= pagination.totalPages}
                                        className="rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.08,
                                        },
                                    },
                                }}
                                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                {products.map((product) => (
                                    <motion.div
                                        key={product._id}
                                        variants={{
                                            hidden: {
                                                opacity: 0,
                                                y: 30,
                                            },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    duration: 0.5,
                                                },
                                            },
                                        }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default Collection;
