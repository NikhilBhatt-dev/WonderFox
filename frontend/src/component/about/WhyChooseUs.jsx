import {
    ShieldCheck,
    Cloud,
    HeartHandshake,
    Truck,
} from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Safe Materials",
        desc: "Every toy is made from carefully selected, child-safe materials that meet high quality standards.",
    },
    {
        icon: Cloud,
        title: "Super Soft",
        desc: "Soft, cozy, and comforting plush toys designed for endless hugs and smiles.",
    },
    {
        icon: HeartHandshake,
        title: "Loved by Families",
        desc: "Chosen to inspire creativity, imagination, and memorable moments for children.",
    },
    {
        icon: Truck,
        title: "Fast Delivery",
        desc: "Secure packaging and reliable shipping ensure every order arrives safely.",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="bg-[#FAF5EC] py-12 sm:py-24">
            <div className="container mx-auto px-5">

                <div className="rounded-[32px] bg-[#DDF8DD] p-5 sm:rounded-[40px] sm:p-8 md:p-14">

                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

                        {/* LEFT */}

                        <div>

                            <span className="uppercase tracking-[4px] text-sm font-semibold text-[#5A7D62]">
                                Why Choose WonderFox
                            </span>

                            <h2 className="mt-5 text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
                                Every Smile
                                <br />
                                Starts With
                                <br />
                                Quality & Care.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Every product at WonderFox is carefully selected to bring
                                happiness, comfort, and confidence to every family. Our goal
                                isn't just selling toys—it's creating joyful childhood
                                experiences.
                            </p>

                            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">

                                <div>
                                    <h3 className="text-3xl font-black text-[#FF7A45] sm:text-4xl">
                                        100%
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        Child-Friendly Products
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-black text-[#FF7A45] sm:text-4xl">
                                        Premium
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        Quality Collection
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="grid md:grid-cols-2 gap-6">

                            {features.map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-3xl bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8"
                                >
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                                        <item.icon className="text-[#FF7A45]" size={28} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-4 leading-7 text-gray-600">
                                        {item.desc}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;
