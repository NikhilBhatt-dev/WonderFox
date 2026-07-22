import categories from "../../data/categories";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import CategoryCard from "../common/CategoryCard";

const Categories = () => {
    return (
        <section className="bg-[#FFF8F3] py-20">

            <Container>

                <SectionHeading
                    badge="Browse"
                    title="Shop by Category"
                    subtitle="Find the perfect toy for every child."
                />

                <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                        />
                    ))}

                </div>

            </Container>

        </section>
    );
};

export default Categories;