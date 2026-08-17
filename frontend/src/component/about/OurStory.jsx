import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const OurStory = () => {
    return (
        <section className="bg-white py-12 sm:py-20">
            <div className="container mx-auto px-5">

                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

                    {/* Image */}

                    <div className="relative">

                        <img
                            src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
                            alt="Kids Playing"
                            className="aspect-[4/3] w-full rounded-[35px] object-cover shadow-xl sm:h-[550px] sm:aspect-auto"
                        />

                        <div className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-3xl bg-white p-4 shadow-lg sm:bottom-6 sm:left-6 sm:max-w-none sm:p-6">
                            <h3 className="text-2xl font-bold text-[#FF7A45] sm:text-3xl">
                                Quality First
                            </h3>

                            <p className="text-gray-500 mt-1">
                                Carefully selected toys for every child.
                            </p>
                        </div>

                    </div>

                    {/* Content */}

                    <div>

                        <span className="uppercase tracking-[4px] text-orange-500 font-semibold">
                            Our Story
                        </span>

                        <h2 className="mt-4 text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
                            More Than A Toy Store.
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            WonderFox was created with one simple idea — every child deserves
                            toys that inspire creativity, encourage learning, and create
                            unforgettable childhood memories.
                        </p>

                        <p className="mt-5 text-lg leading-8 text-gray-600">
                            We carefully curate every product in our collection, focusing on
                            quality, safety, and fun. From adorable plush friends to exciting
                            educational toys, every item is chosen with parents and children
                            in mind.
                        </p>

                        <p className="mt-5 text-lg leading-8 text-gray-600">
                            As we prepare for our official launch, our mission remains the
                            same—to become a trusted destination where families can shop with
                            confidence and children can discover their next favorite toy.
                        </p>

                        <Link
                            to="/collecction"
                            className="inline-flex items-center gap-2 mt-8 bg-[#FF7A45] text-white px-7 py-4 rounded-full font-semibold hover:bg-orange-600 transition"
                        >
                            Explore Collection
                            <ArrowRight size={20} />
                        </Link>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default OurStory;
