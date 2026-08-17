import { useState } from "react";
import toast from "react-hot-toast";
import Container from "../component/common/Container";
import api from "../api/axios";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || !email || !subject || !message) {
      toast.error("Please complete all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setIsSending(true);
      const response = await api.post("/contact", { name, email, subject, message });
      toast.success(response.data?.message || "Your message has been sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "We could not send your message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

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

          <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl bg-white p-5 shadow-lg sm:p-8">

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            ></textarea>

            <button
              type="submit"
              disabled={isSending}
              className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>

      </Container>

    </section>
  );
};

export default Contact;
