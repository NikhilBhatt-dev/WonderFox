const SectionHeading = ({ badge, title, subtitle }) => {
    return (
        <div className="mb-14 text-center">
            {badge && (
                <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-500">
                    {badge}
                </span>
            )}

            <h2 className="mt-5 text-4xl font-bold text-gray-800 lg:text-5xl">
                {title}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                {subtitle}
            </p>
        </div>
    );
};

export default SectionHeading;