



import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getProducts } from "../../services/product.service";

import ProductCard from "../common/ProductCard";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center">
        Loading Products...
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center text-red-500">
        {error}
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          badge="Popular Toys"
          title="Featured Products"
          subtitle="Best toys loved by thousands of happy kids."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 40,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                  },
                },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;