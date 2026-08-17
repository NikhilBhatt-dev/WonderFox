const FeatureCard = ({ feature }) => {
    const Icon = feature.icon;

    return (
        <div className="min-w-0 rounded-3xl bg-white p-3 text-center shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-5 lg:p-6">

            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 sm:h-16 sm:w-16">
                <Icon className="h-5 w-5 text-orange-500 sm:h-7 sm:w-7" />
            </div>

            <h3 className="mt-3 break-words text-sm font-semibold sm:mt-5 sm:text-xl">
                {feature.title}
            </h3>

            <p className="mt-2 break-words text-xs leading-5 text-gray-500 sm:mt-3 sm:text-base sm:leading-normal">
                {feature.description}
            </p>

        </div>
    );
};

export default FeatureCard;
