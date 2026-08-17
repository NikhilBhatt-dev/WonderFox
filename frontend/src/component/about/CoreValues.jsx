import {
    Heart,
    ShieldCheck,
    Sparkles,
    Smile,
} from "lucide-react";

const values = [
    {
        icon: Heart,
        title: "Made With Love",
        desc: "Every product is chosen with care to bring comfort, happiness, and memorable moments to every child.",
    },
    {
        icon: ShieldCheck,
        title: "Safety First",
        desc: "We prioritize child-friendly materials and carefully selected products that parents can trust.",
    },
    {
        icon: Sparkles,
        title: "Premium Quality",
        desc: "From plush toys to educational games, we focus on quality that lasts beyond playtime.",
    },
    {
        icon: Smile,
        title: "Creating Smiles",
        desc: "Our biggest goal is to make every child smile and every family enjoy a joyful shopping experience.",
    },
];

const CoreValues = () => {
    return (
        <section className="bg-white py-12 sm:py-24">
            <div className="container mx-auto px-5">

                <div className="text-center max-w-3xl mx-auto">
                    <span className="uppercase tracking-[4px] text-orange-500 font-semibold text-sm">
                        Our Core Values
                    </span>

                    <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-5xl">
                        What Drives Everything We Do
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        At WonderFox, our values shape every decision—from selecting the
                        right products to delivering an exceptional experience for every
                        family.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {values.map((value) => (
                        <div
                            key={value.title}
                            className="group rounded-3xl border border-gray-100 bg-[#FAF5EC] p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 group-hover:bg-[#FF7A45] transition-colors">
                                <value.icon
                                    size={30}
                                    className="text-[#FF7A45] group-hover:text-white transition-colors"
                                />
                            </div>

                            <h3 className="mt-6 text-2xl font-bold text-gray-900">
                                {value.title}
                            </h3>

                            <p className="mt-4 leading-7 text-gray-600">
                                {value.desc}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default CoreValues;
