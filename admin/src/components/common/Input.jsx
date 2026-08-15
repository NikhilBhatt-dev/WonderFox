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
                <label className="text-sm font-medium text-[#1F2937]">
                    {label}
                </label>
            )}

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border px-4 py-2 text-[#1F2937] outline-none transition focus:border-[#334E68]"
            />
        </div>
    );
};

export default Input;
