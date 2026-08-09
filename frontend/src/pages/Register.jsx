import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Container from "../component/common/Container";

import { registerUser } from "../services/auth.service";

const Register = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    password: "",

    confirmPassword: "",

  });

  const handleChange = (e) => {

    setFormData((prev) => ({

      ...prev,

      [e.target.name]: e.target.value,

    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Name is required.");
    }

    if (!formData.email.trim()) {
      return toast.error("Email is required.");
    }

    if (!formData.password.trim()) {
      return toast.error("Password is required.");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {

      setLoading(true);

      const response = await registerUser({

        name: formData.name,

        email: formData.email,

        password: formData.password,

      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success(response.message);

      navigate("/");

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Registration failed."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="flex min-h-screen items-center bg-[#FFF8F3] py-16">

      <Container>

        <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl">

          <h1 className="text-center text-4xl font-bold text-gray-800">

            Create Account

          </h1>

          <p className="mt-3 text-center text-gray-500">

            Join WonderFox and start shopping today.

          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div>

              <label className="mb-2 block font-medium">

                Full Name

              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

            </div>

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
                placeholder="Create a password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">

                Confirm Password

              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? "Creating Account..." : "Create Account"}

            </button>

          </form>

          <p className="mt-6 text-center text-gray-600">

            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-semibold text-orange-500"
            >

              Login

            </Link>

          </p>

        </div>

      </Container>

    </section>

  );

};

export default Register;