import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Container from "../component/common/Container";

import { loginUser } from "../services/auth.service";
import { addToCart } from "../services/cart.service";

const Login = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    email: "",

    password: "",

  });

  const handleChange = (e) => {

    setFormData((prev) => ({

      ...prev,

      [e.target.name]: e.target.value,

    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.email.trim()) {

      return toast.error("Email is required.");

    }

    if (!formData.password.trim()) {

      return toast.error("Password is required.");

    }

    try {

      setLoading(true);

      const response = await loginUser(formData);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

      if (Array.isArray(guestCart) && guestCart.length > 0) {
        await Promise.all(
          guestCart.map(async (item) => {
            const productId = item.product?._id || item.productId;
            if (!productId) return null;

            return addToCart({
              productId,
              quantity: Number(item.quantity || 1),
            });
          }),
        );

        localStorage.removeItem("guestCart");
        window.dispatchEvent(new CustomEvent("cart:updated"));
      }

      toast.success(response.message);

      const redirectPath = new URLSearchParams(window.location.search).get("redirect") || "/";
      navigate(redirectPath.startsWith("/") ? redirectPath : "/");

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Login failed."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="flex min-h-screen items-center bg-[#FFF8F3] py-8 sm:py-16">

      <Container>

        <div className="mx-auto max-w-md rounded-3xl bg-white p-5 shadow-xl sm:p-8">

          <h1 className="text-center text-3xl font-bold text-gray-800 sm:text-4xl">

            Welcome Back

          </h1>

          <p className="mt-3 text-center text-gray-500">

            Login to continue shopping.

          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div>

              <label className="mb-2 block font-medium">

                Email

              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">

                Password

              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? "Logging in..." : "Login"}

            </button>

          </form>

          <p className="mt-6 text-center text-gray-600">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 font-semibold text-orange-500"
            >

              Register

            </Link>

          </p>

        </div>

      </Container>

    </section>

  );

};

export default Login;
