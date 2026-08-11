import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
    return (
        <Link
            to={`/collection?category=${category._id}`}
            className="group block cursor-pointer rounded-3xl bg-white p-5 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
            <div className="overflow-hidden rounded-2xl bg-[#FFF8F3] p-4">

                <img
                    src={category.image}
                    alt={category.name}
                    className="mx-auto h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                />

            </div>

            <div className="mt-5 flex items-center justify-between">

                <div>

                    <h3 className="text-xl font-semibold text-gray-800">
                        {category.name}
                    </h3>

                    {category.items && (
                        <p className="mt-2 text-gray-500">
                            {category.items} Items
                        </p>
                    )}

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white transition duration-300 group-hover:bg-orange-500">

                    <ArrowUpRight size={18} />

                </div>

            </div>

        </Link>
    );
};

export default CategoryCard;