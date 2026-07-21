const Button = ({
    children,
    variant = "primary",
    className = "",
    ...props
}) => {
    const baseStyle =
        "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold transition-all duration-300";

    const variants = {
        primary:
            "bg-orange-500 text-white hover:bg-orange-600 hover:scale-105",

        secondary:
            "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 hover:scale-105",
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;