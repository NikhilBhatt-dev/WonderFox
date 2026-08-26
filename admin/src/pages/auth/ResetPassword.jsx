import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import PasswordInput from "../../components/common/PasswordInput";
import Button from "../../components/common/Button";

import { resetPassword } from "../../services/auth.service";

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
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

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const response = await resetPassword(
                token,
                formData.password,
            );

            toast.success(response.message);

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to reset password",
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
                        Create a new admin password
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <PasswordInput
                        label="New Password"
                        name="password"
                        placeholder="Enter new password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <PasswordInput
                        label="Confirm Password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Resetting..."
                            : "Reset Password"}
                    </Button>

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="w-full text-sm text-[#334E68] hover:text-[#263B50] hover:underline"
                    >
                        Back to Login
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ResetPassword;