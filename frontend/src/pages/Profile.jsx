import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../component/common/Container";

const Profile = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {

      navigate("/login");

      return;

    }

    setUser(JSON.parse(storedUser));

  }, [navigate]);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  if (!user) {

    return null;

  }

  return (

    <section className="min-h-screen bg-[#FFF8F3] py-16">

      <Container>

        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-5 shadow-lg sm:p-8">

          <div className="flex flex-col items-center gap-6 md:flex-row">

            {/* Avatar */}

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-orange-100 text-4xl sm:h-36 sm:w-36 sm:text-6xl">

              👤

            </div>

            {/* User Info */}

            <div className="min-w-0 text-center md:text-left">

              <h1 className="break-words text-2xl font-bold text-gray-800 sm:text-3xl">

                {user.name}

              </h1>

              <p className="mt-2 text-gray-500">

                {user.email}

              </p>

              <p className="text-gray-500">

                Customer Account

              </p>

            </div>

          </div>

          {/* Details */}

          <div className="mt-12 grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium">

                Full Name

              </label>

              <input
                type="text"
                value={user.name}
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">

                Email

              </label>

              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">

                Role

              </label>

              <input
                type="text"
                value={user.role}
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 capitalize"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">

                Account Status

              </label>

              <input
                type="text"
                value="Active"
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3"
              />

            </div>

          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">

            <button
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >

              Edit Profile

            </button>

            <button
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100"
            >

              Change Password

            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
            >

              Logout

            </button>

          </div>

        </div>

      </Container>

    </section>

  );

};

export default Profile;
