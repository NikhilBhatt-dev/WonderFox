const Button = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    ...props
}) => {

    const variants = {
        primary:
            "bg-primary text-white hover:bg-secondary",

        secondary:
            "bg-secondary text-white hover:bg-primary",

        outline:
            "border border-primary bg-white text-primary hover:bg-primary hover:text-white",

        danger:
            "bg-danger text-white hover:opacity-90",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3",
        lg: "px-8 py-4 text-lg",
    };

    return (

        <button
            disabled={disabled}
            {...props}
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-button
                font-semibold
                transition-all
                duration-300
                disabled:cursor-not-allowed
                disabled:opacity-60
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
        >

            {children}

        </button>

    );

};

export default Button;