import { Send } from "lucide-react";

const Newsletter = () => {
    return (
        <section className="bg-[#FFF8F3] py-20">
            <div className="mx-auto max-w-4xl rounded-3xl bg-orange-500 px-8 py-16 text-center text-white">

                <h2 className="text-4xl font-bold">
                    Subscribe To Our Newsletter
                </h2>

                <p className="mt-4 text-orange-100">
                    Get updates about new toys, offers and special discounts.
                </p>

                <div className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 rounded-2xl px-5 py-4 text-gray-700 outline-none"
                    />

                    <button className="flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-orange-500 transition-all duration-300 hover:scale-105">

                        Subscribe

                        <Send size={18} />

                    </button>

                </div>

            </div>
        </section>
    );
};

export default Newsletter;