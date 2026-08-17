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

                <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">

                    {values.map((value) => (
                        <div
                            key={value.title}
                            className="group min-w-0 rounded-3xl border border-gray-100 bg-[#FAF5EC] p-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-5 lg:p-8"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 transition-colors group-hover:bg-[#FF7A45] sm:h-16 sm:w-16 sm:rounded-2xl">
                                <value.icon
                                    className="h-5 w-5 text-[#FF7A45] transition-colors group-hover:text-white sm:h-7 sm:w-7"
                                />
                            </div>

                            <h3 className="mt-3 break-words text-base font-bold text-gray-900 sm:mt-6 sm:text-xl lg:text-2xl">
                                {value.title}
                            </h3>

                            <p className="mt-2 break-words text-sm leading-5 text-gray-600 sm:mt-4 sm:leading-7">
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
