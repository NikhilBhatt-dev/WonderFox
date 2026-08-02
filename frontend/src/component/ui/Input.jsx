const Input = ({
    icon: Icon,
    className = "",
    ...props
}) => {

    return (

        <div className="relative">

            {Icon && (

                <Icon
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                />

            )}

            <input
                {...props}
                className={`
                    w-full
                    rounded-button
                    border
                    border-gray-200
                    bg-white
                    py-3
                    ${Icon ? "pl-12" : "pl-4"}
                    pr-4
                    outline-none
                    transition
                    focus:border-primary
                    focus:ring-4
                    focus:ring-blue-100
                    ${className}
                `}
            />

        </div>

    );

};

export default Input;