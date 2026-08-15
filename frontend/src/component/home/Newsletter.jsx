import { useState } from "react";
import toast from "react-hot-toast";

import api from "../../api/axios";
import Container from "../common/Container";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setMessage("Please enter your email address.");
            return toast.error("Please enter your email address.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(trimmedEmail)) {
            setMessage("Please enter a valid email address.");
            return toast.error("Please enter a valid email address.");
        }

        try {
            setLoading(true);
            setMessage("");

            const response = await api.post("/newsletter/subscribe", { email: trimmedEmail });

            setEmail("");
            setMessage(response.data?.message || "Successfully subscribed.");
            toast.success(response.data?.message || "Successfully subscribed.");
        } catch (error) {
            const backendMessage = error.response?.data?.message || "Something went wrong.";

            if (backendMessage === "Already subscribed") {
                setMessage("Already subscribed");
                toast.error("Already subscribed");
                return;
            }

            setMessage(backendMessage);
            toast.error(backendMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        // <section className="bg-orange-500 py-20">

        //     <Container>

        //         <div className="mx-auto max-w-3xl text-center">

        //             <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
        //                 Stay Updated
        //             </span>

        //             <h2 className="mt-6 text-4xl font-bold text-white">
        //                 Join Our Newsletter
        //             </h2>

        //             <p className="mt-4 text-orange-100">
        //                 Subscribe and get updates about new arrivals,
        //                 special offers and exclusive discounts.
        //             </p>

        //             <form className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">

        //                 <input
        //                     type="email"
        //                     placeholder="Enter your email"
        //                     className="flex-1 rounded-2xl px-6 py-4 outline-none"
        //                 />

        //                 <button
        //                     type="submit"
        //                     className="rounded-2xl bg-white px-8 py-4 font-semibold text-orange-500 transition hover:bg-orange-100"
        //                 >
        //                     Subscribe
        //                 </button>

        //             </form>

        //         </div>

        //     </Container>

        // </section>

        <section className="py-20 bg-[#f7f2e8]">
            <div className="max-w-6xl mx-auto px-6">
                <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#ff7a45] to-[#ff9b68] px-8 py-14 text-center">

                    {/* Small Decorative Icons */}
                    <span className="absolute left-10 top-10 text-white text-2xl">✦</span>
                    <span className="absolute right-12 bottom-8 text-white text-3xl">♡</span>

                    <p className="uppercase tracking-[4px] text-sm font-bold text-[#ffe5b4]">
                        Stay Updated
                    </p>

                    <h2 className="mt-4 text-4xl font-extrabold text-white">
                        A sprinkle of joy, straight to your inbox.
                    </h2>

                    <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
                        New friends, thoughtful gifting ideas, and sweet little surprises —
                        no clutter, ever.
                    </p>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">

                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Your email address"
                            className="w-full flex-1 rounded-2xl bg-white px-6 py-5 text-lg outline-none placeholder:text-gray-400"
                            disabled={loading}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-2xl bg-[#40352f] px-10 py-5 text-lg font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-75"
                        >
                            {loading ? "Subscribing..." : "Subscribe"}
                        </button>

                    </form>

                    {message && (
                        <p className="mt-4 text-sm font-medium text-white/90">{message}</p>
                    )}

                </div>
            </div>
        </section>
    );
};

export default Newsletter;
