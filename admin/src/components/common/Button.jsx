const Button = ({
    children,
    type = "button",
    onClick,
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="admin-primary-button w-full px-4 py-2 font-medium disabled:cursor-not-allowed disabled:opacity-50"
        >
            {children}
        </button>
    );
};

export default Button;
