import products from "../../data/Products";
import ProductCard from "../common/productCard";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { motion } from "framer-motion";

const FeaturedProducts = () => {
  console.log(products);
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
              key={product.id}
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