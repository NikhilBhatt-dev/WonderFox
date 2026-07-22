import { Link } from "react-router-dom";
import Container from "../component/common/Container";

const Register = () => {
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

          <form className="mt-8 space-y-5">

            <div>
              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <input
                type="text"
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
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Create Account
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