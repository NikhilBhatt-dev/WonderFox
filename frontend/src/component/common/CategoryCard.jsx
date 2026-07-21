const CategoryCard = ({ category }) => {
    return (
        <div className="group cursor-pointer rounded-3xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

            <div className="text-6xl transition-transform duration-300 group-hover:scale-110">
                {category.icon}
            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-800">
                {category.name}
            </h3>

        </div>
    );
};

export default CategoryCard;