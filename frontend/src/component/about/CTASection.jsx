import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
    return (
        <section className="bg-[#FAF5EC] py-12 sm:py-24">
            <div className="container mx-auto px-5">

                <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#FF7A45] to-[#FF9A62] px-5 py-12 sm:rounded-[40px] sm:px-8 sm:py-16 lg:px-20 lg:py-20">

                    {/* Decorative Blur */}

                    <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative z-10 text-center">

                        <span className="uppercase tracking-[4px] text-sm font-semibold text-orange-100">
                            Ready To Explore?
                        </span>

                        <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                            Find Your Child's
                            <br />
                            Next Favorite Toy
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90">
                            Discover a joyful collection of plush toys, educational games,
                            and fun-filled products carefully selected for every stage of childhood.
                        </p>

                        <div className="mt-10 flex flex-wrap justify-center gap-5">

                            <Link
                                to="/collection"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#FF7A45] transition hover:scale-105 sm:w-auto"
                            >
                                Shop Now
                                <ArrowRight size={20} />
                            </Link>

                            <Link
                                to="/contact"
                                className="w-full rounded-full border border-white px-8 py-4 text-center font-semibold text-white transition hover:bg-white hover:text-[#FF7A45] sm:w-auto"
                            >
                                Contact Us
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default CTASection;
