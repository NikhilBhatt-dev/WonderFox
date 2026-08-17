import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
    return (
        <Link
            to={`/collection?category=${category._id}`}
            className="group block min-w-0 cursor-pointer rounded-3xl bg-white p-3 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-5"
        >
            <div className="overflow-hidden rounded-2xl bg-[#FFF8F3] p-2 sm:p-4">

                <img
                    src={category.image}
                    alt={category.name}
                    className="mx-auto aspect-square w-full object-cover transition duration-500 group-hover:scale-105 sm:h-48 sm:aspect-auto"
                />

            </div>

            <div className="mt-3 flex min-w-0 items-center justify-between gap-2 sm:mt-5">

                <div className="min-w-0">

                    <h3 className="break-words text-sm font-semibold text-gray-800 sm:text-xl">
                        {category.name}
                    </h3>

                    {category.items && (
                        <p className="mt-2 text-gray-500">
                            {category.items} Items
                        </p>
                    )}

                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white transition duration-300 group-hover:bg-orange-500 sm:h-10 sm:w-10">

                    <ArrowUpRight size={18} />

                </div>

            </div>

        </Link>
    );
};

export default CategoryCard;
