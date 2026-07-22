import Container from "../common/Container";

const Newsletter = () => {
    return (
        <section className="bg-orange-500 py-20">

            <Container>

                <div className="mx-auto max-w-3xl text-center">

                    <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
                        Stay Updated
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-white">
                        Join Our Newsletter
                    </h2>

                    <p className="mt-4 text-orange-100">
                        Subscribe and get updates about new arrivals,
                        special offers and exclusive discounts.
                    </p>

                    <form className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 rounded-2xl px-6 py-4 outline-none"
                        />

                        <button
                            type="submit"
                            className="rounded-2xl bg-white px-8 py-4 font-semibold text-orange-500 transition hover:bg-orange-100"
                        >
                            Subscribe
                        </button>

                    </form>

                </div>

            </Container>

        </section>
    );
};

export default Newsletter;