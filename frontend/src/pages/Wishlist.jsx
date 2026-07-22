import Container from "../component/common/Container";
import ProductCard from "../component/common/ProductCard";
import products from "../data/Products";

const Wishlist = () => {
    return (
        <section className="bg-[#FFF8F3] py-16">

            <Container>

                <div className="mb-12 text-center">

                    <h1 className="text-4xl font-bold text-gray-800">
                        My Wishlist
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Save your favorite toys for later.
                    </p>

                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

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

export default Wishlist;