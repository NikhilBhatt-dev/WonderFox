const StatCard = ({ title, value, prefix = "" }) => {
    return (
        <div className="admin-card p-6">

            <h3 className="text-[#6B7280]">
                {title}
            </h3>

            <p className="mt-2 text-3xl font-bold text-[#1F2937]">
                {prefix}{value}
            </p>

        </div>
    );
};

export default StatCard;
