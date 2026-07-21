import products from "../../data/products";
import ProductCard from "../common/ProductCard";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

const FeaturedProducts = () => {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          badge="Popular Toys"
          title="Featured Products"
          subtitle="Best toys loved by thousands of happy kids."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;