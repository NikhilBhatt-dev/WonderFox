import {
    Search,
    BadgeCheck,
    PackageCheck,
    Truck,
} from "lucide-react";

const process = [
    {
        icon: Search,
        title: "Carefully Selected",
        desc: "Every product is handpicked to ensure quality, safety, and endless fun.",
    },
    {
        icon: BadgeCheck,
        title: "Quality Checked",
        desc: "Each toy is reviewed to meet our standards before becoming part of our collection.",
    },
    {
        icon: PackageCheck,
        title: "Packed With Care",
        desc: "Every order is securely packed to keep your products safe during transit.",
    },
    {
        icon: Truck,
        title: "Delivered To You",
        desc: "Fast and reliable shipping brings happiness right to your doorstep.",
    },
];

const OurProcess = () => {
    return (
        <section className="py-24 bg-[#FAF5EC]">
            <div className="container mx-auto px-5">

                <div className="text-center max-w-3xl mx-auto">

                    <span className="uppercase tracking-[4px] text-orange-500 font-semibold text-sm">
                        Our Process
                    </span>

                    <h2 className="mt-4 text-5xl font-black text-gray-900">
                        How Every Toy Reaches You
                    </h2>

                    <p className="mt-6 text-lg text-gray-600 leading-8">
                        From selecting premium products to safely delivering them to your home,
                        every step is handled with care and attention.
                    </p>

                </div>

                <div className="mt-20 grid lg:grid-cols-4 md:grid-cols-2 gap-8">

                    {process.map((item, index) => (
                        <div
                            key={item.title}
                            className="relative rounded-3xl bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition"
                        >
                            <div className="absolute -top-5 left-8 h-10 w-10 rounded-full bg-[#FF7A45] text-white flex items-center justify-center font-bold">
                                {index + 1}
                            </div>

                            <div className="mt-6 h-16 w-16 rounded-2xl bg-orange-100 flex items-center justify-center">
                                <item.icon className="text-[#FF7A45]" size={30} />
                            </div>

                            <h3 className="mt-6 text-2xl font-bold">
                                {item.title}
                            </h3>

                            <p className="mt-4 text-gray-600 leading-7">
                                {item.desc}
                            </p>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default OurProcess;