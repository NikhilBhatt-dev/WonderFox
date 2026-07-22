import Container from "../component/common/Container";

const Profile = () => {
  return (
    <section className="bg-[#FFF8F3] py-16 min-h-screen">

      <Container>

        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-lg">

          <div className="flex flex-col items-center gap-6 md:flex-row">

            {/* Profile Image */}

            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-orange-100 text-6xl">
              👤
            </div>

            {/* User Info */}

            <div>

              <h1 className="text-3xl font-bold text-gray-800">
                Kevin Sharma
              </h1>

              <p className="mt-2 text-gray-500">
                kevin@example.com
              </p>

              <p className="text-gray-500">
                +91 9876543210
              </p>

            </div>

          </div>

          {/* Profile Details */}

          <div className="mt-12 grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <input
                type="text"
                value="Kevin Sharma"
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
                value="kevin@example.com"
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Phone
              </label>

              <input
                type="text"
                value="+91 9876543210"
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Address
              </label>

              <input
                type="text"
                value="New Delhi, India"
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3"
              />

            </div>

          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">

            <button className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600">
              Edit Profile
            </button>

            <button className="rounded-xl border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100">
              Change Password
            </button>

            <button className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600">
              Logout
            </button>

          </div>

        </div>

      </Container>

    </section>
  );
};

export default Profile;