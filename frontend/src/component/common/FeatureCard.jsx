const FeatureCard = ({ feature }) => {
    return (
        <div className="rounded-3xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

            <div className="text-6xl">
                {feature.icon}
            </div>

            <h3 className="mt-5 text-2xl font-semibold text-gray-800">
                {feature.title}
            </h3>

            <p className="mt-3 text-gray-500">
                {feature.description}
            </p>

        </div>
    );
};

export default FeatureCard;