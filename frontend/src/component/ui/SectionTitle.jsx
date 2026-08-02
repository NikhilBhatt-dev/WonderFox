const SectionTitle = ({
    title,
    subtitle,
}) => {

    return (

        <div className="mb-8">

            <h2 className="text-3xl font-bold text-heading">
                {title}
            </h2>

            {subtitle && (

                <p className="mt-2 text-body">
                    {subtitle}
                </p>

            )}

        </div>

    );

};

export default SectionTitle;