import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const OurStory = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-5">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Image */}

                    <div className="relative">

                        <img
                            src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"
                            alt="Kids Playing"
                            className="rounded-[35px] shadow-xl w-full h-[550px] object-cover"
                        />

                        <div className="absolute bottom-6 left-6 bg-white rounded-3xl p-6 shadow-lg">
                            <h3 className="text-3xl font-bold text-[#FF7A45]">
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

                        <h2 className="mt-4 text-5xl font-black leading-tight text-gray-900">
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