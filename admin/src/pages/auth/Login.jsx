import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../components/common/Input";
import PasswordInput from "../../components/common/PasswordInput";
import Button from "../../components/common/Button";

import { login } from "../../services/auth.service";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await login(formData);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user),
            );

            toast.success(response.message);

            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F7F7F5] px-4">
            <div className="admin-card w-full max-w-md p-8">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-[#26364A]">
                        <span className="text-[#FF6B00]">Wonder</span>Fox
                    </h1>

                    <p className="mt-2 text-[#6B7280]">
                        Admin Panel Login
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <PasswordInput
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <div className="flex items-center justify-between text-sm">

                        <label className="flex items-center gap-2">
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <button
                            type="button"
                            className="text-[#334E68] hover:text-[#263B50] hover:underline"
                        >
                            Forgot Password?
                        </button>

                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Login"}
                    </Button>

                </form>

            </div>
        </div>
    );
};

export default Login;
