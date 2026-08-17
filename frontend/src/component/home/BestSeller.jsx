import bestSeller from "../../data/bestSeller";

import Container from "../common/Container";
import ProductCard from "../common/ProductCard";
import SectionHeading from "../common/SectionHeading";

const BestSeller = () => {
    return (
        <section className="bg-white py-20">

            <Container>

                <SectionHeading
                    badge="Top Picks"
                    title="Best Sellers"
                    subtitle="Our most loved toys by happy families."
                />

                <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">

                    {bestSeller.map((product) => (
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

export default BestSeller;
