import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
    label,
    name,
    placeholder,
    value,
    onChange,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-[#1F2937]">
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full rounded-lg border px-4 py-2 pr-12 text-[#1F2937] outline-none transition focus:border-[#334E68]"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
