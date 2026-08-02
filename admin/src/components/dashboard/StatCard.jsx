const StatCard = ({ title, value, prefix = "" }) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow">

            <h3 className="text-gray-500">
                {title}
            </h3>

            <p className="mt-2 text-3xl font-bold">
                {prefix}{value}
            </p>

        </div>
    );
};

export default StatCard;