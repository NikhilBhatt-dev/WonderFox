import Container from "../component/common/Container";

const Contact = () => {
  return (
    <section className="bg-[#FFF8F3] py-10 sm:py-16">

      <Container>

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-500">
            Contact Us
          </span>

          <h1 className="mt-6 text-3xl font-bold text-gray-800 sm:text-5xl">
            We'd Love to Hear From You
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Have a question, suggestion or need help? Send us a message
            and our team will get back to you soon.
          </p>

        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          {/* Contact Info */}

          <div className="space-y-6 rounded-3xl bg-white p-5 shadow-lg sm:p-8">

            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                📍 Address
              </h3>

              <p className="mt-2 text-gray-600">
                WonderFox Toys Pvt. Ltd.
                <br />
                New Delhi, India
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                📞 Phone
              </h3>

              <p className="mt-2 text-gray-600">
                +91 9876543210
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                📧 Email
              </h3>

              <p className="mt-2 text-gray-600">
                support@wonderfox.com
              </p>
            </div>

          </div>

          {/* Contact Form */}

          <form className="space-y-5 rounded-3xl bg-white p-5 shadow-lg sm:p-8">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            ></textarea>

            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Send Message
            </button>

          </form>

        </div>

      </Container>

    </section>
  );
};

export default Contact;
