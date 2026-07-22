import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#FFF8F3] px-6">

      <div className="text-center">

        <h1 className="text-8xl font-extrabold text-orange-500">
          404
        </h1>

        <h2 className="mt-6 text-4xl font-bold text-gray-800">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-10 inline-block rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
        >
          Back To Home
        </Link>

      </div>

    </section>
  );
};

export default NotFound;