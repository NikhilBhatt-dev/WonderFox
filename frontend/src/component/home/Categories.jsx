import categories from "../../data/categories";
import CategoryCard from "../common/CategoryCard";

const Categories = () => {
    return (
        <section className="bg-[#FFF8F3] py-20">

            <div className="mx-auto max-w-7xl px-6">

                <h2 className="text-center text-5xl font-bold">
                    Shop By Category
                </h2>

                <p className="mt-4 text-center text-gray-500">
                    Choose your favourite toy category.
                </p>

                <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
};

export default Categories;