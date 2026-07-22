const FeatureCard = ({ feature }) => {
    const Icon = feature.icon;

    return (
        <div className="rounded-3xl bg-white p-6 text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <Icon size={30} className="text-orange-500" />
            </div>

            <h3 className="mt-5 text-xl font-semibold">
                {feature.title}
            </h3>

            <p className="mt-3 text-gray-500">
                {feature.description}
            </p>

        </div>
    );
};

export default FeatureCard;