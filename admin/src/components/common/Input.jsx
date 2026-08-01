const Input = ({
    label,
    type = "text",
    name,
    placeholder,
    value,
    onChange,
}) => {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500"
            />
        </div>
    );
};

export default Input;