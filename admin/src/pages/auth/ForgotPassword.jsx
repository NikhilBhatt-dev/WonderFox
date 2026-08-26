import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { forgotPassword } from "../../services/auth.service";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await forgotPassword(email);

            toast.success(response.message);

            setEmail("");

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to send reset email",
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
                        Reset your admin password
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <Input
                        label="Admin Email"
                        type="email"
                        name="email"
                        placeholder="Enter your admin email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Sending..."
                            : "Send Reset Link"}
                    </Button>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="w-full text-sm text-[#334E68] hover:text-[#263B50] hover:underline"
                    >
                        Back to Login
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ForgotPassword;