import bestSeller from "../../data/bestSeller";
import ProductCard from "../common/ProductCard";

const BestSeller = () => {
    return (
        <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h2 className="text-5xl font-bold">
                            Best Sellers
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Customer's favourite toys.
                        </p>
                    </div>

                    <button className="rounded-xl border border-orange-500 px-6 py-3 font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white">
                        View All
                    </button>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {bestSeller.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default BestSeller;