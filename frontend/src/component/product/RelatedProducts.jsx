import ProductCard from "../common/ProductCard";
import SectionTitle from "../ui/SectionTitle";

const RelatedProducts = ({
    products,
    currentProductId,
}) => {

    const relatedProducts = products
        .filter((item) => item._id !== currentProductId)
        .slice(0, 4);

    if (relatedProducts.length === 0) {
        return null;
    }

    return (

        <section className="mt-20">

            <SectionTitle
                title="Related Products"
                subtitle="You may also like these adorable toys."
            />

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                {relatedProducts.map((product) => (

                    <ProductCard
                        key={product._id}
                        product={product}
                    />

                ))}

            </div>

        </section>

    );

};

export default RelatedProducts;