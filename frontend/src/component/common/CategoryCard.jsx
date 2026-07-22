const CategoryCard = ({ category }) => {
    return (
        <div className="group cursor-pointer rounded-3xl bg-white p-5 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">

            <div className="overflow-hidden rounded-2xl bg-[#FFF8F3] p-4">

                <img
                    src={category.image}
                    alt={category.name}
                    className="mx-auto h-48 w-full object-contain transition duration-500 group-hover:scale-105"
                />

            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-800">
                {category.name}
            </h3>

            <p className="mt-2 text-gray-500">
                {category.items} Items
            </p>

        </div>
    );
};

export default CategoryCard;