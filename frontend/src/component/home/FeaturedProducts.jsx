import { useEffect, useState } from "react";
import { ArrowRight, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getProducts } from "../../services/product.service";

import ProductCard from "../common/ProductCard";
import Container from "../common/Container";

const FeaturedProducts = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);

        const data = await getProducts({ sort: "-createdAt", limit: 8 });

        setProducts(data.products || []);

      } catch (err) {

        console.error("Failed to load products:", err);

        setError("Failed to load products.");

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

  return (

    <section className="bg-[#FFF8F3] py-20">

      <Container>

        {/* SECTION HEADER */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Our Collection
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              New Arrivals
            </h2>

            <p className="mt-4 max-w-xl text-gray-500">
              Freshly added favourites made to bring
              more play, imagination and joy into everyday moments.
            </p>

          </div>

          <Link
            to="/collection"
            className="group inline-flex w-fit items-center gap-2 font-semibold text-gray-800 transition hover:text-orange-500"
          >

            View All Products

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </Link>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="overflow-hidden rounded-3xl bg-white"
              >

                <div className="aspect-square animate-pulse bg-gray-200" />

                <div className="space-y-3 p-5">

                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

                  <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />

                </div>

              </div>

            ))}

          </div>

        )}


        {/* ERROR */}

        {!loading && error && (

          <div className="mt-14 flex flex-col items-center justify-center rounded-3xl bg-white px-6 py-16 text-center shadow-sm">

            <PackageOpen
              size={48}
              className="text-gray-400"
            />

            <h3 className="mt-5 text-xl font-bold text-gray-800">
              Products unavailable
            </h3>

            <p className="mt-2 text-gray-500">
              {error}
            </p>

          </div>

        )}


        {/* EMPTY */}

        {!loading &&
          !error &&
          products.length === 0 && (

            <div className="mt-14 flex flex-col items-center justify-center rounded-3xl bg-white px-6 py-16 text-center shadow-sm">

              <PackageOpen
                size={48}
                className="text-gray-400"
              />

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                No products available
              </h3>

              <p className="mt-2 text-gray-500">
                New products will appear here soon.
              </p>

            </div>

          )}


        {/* LIVE PRODUCTS */}

        {!loading &&
          !error &&
          products.length > 0 && (

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="mt-14 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
            >

              {products.slice(0, 8).map((product) => (

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

                  <ProductCard
                    product={product}
                  />

                </motion.div>

              ))}

            </motion.div>

          )}


        {/* BOTTOM CTA */}

        {!loading &&
          !error &&
          products.length > 8 && (

            <div className="mt-12 flex justify-center">

              <Link
                to="/collection"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gray-900 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500"
              >

                Explore Full Collection

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </Link>

            </div>

          )}

      </Container>

    </section>

  );

};

export default FeaturedProducts;
