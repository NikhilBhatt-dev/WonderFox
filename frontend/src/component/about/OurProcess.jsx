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
        <section className="bg-[#FAF5EC] py-12 sm:py-24">
            <div className="container mx-auto px-5">

                <div className="text-center max-w-3xl mx-auto">

                    <span className="uppercase tracking-[4px] text-orange-500 font-semibold text-sm">
                        Our Process
                    </span>

                    <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-5xl">
                        How Every Toy Reaches You
                    </h2>

                    <p className="mt-6 text-lg text-gray-600 leading-8">
                        From selecting premium products to safely delivering them to your home,
                        every step is handled with care and attention.
                    </p>

                </div>

                <div className="mt-12 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8">

                    {process.map((item, index) => (
                        <div
                            key={item.title}
                            className="relative min-w-0 rounded-3xl bg-white p-3 shadow-sm transition hover:-translate-y-2 hover:shadow-xl sm:p-5 lg:p-8"
                        >
                            <div className="absolute -top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#FF7A45] text-xs font-bold text-white sm:-top-5 sm:left-8 sm:h-10 sm:w-10 sm:text-base">
                                {index + 1}
                            </div>

                            <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 sm:mt-6 sm:h-16 sm:w-16 sm:rounded-2xl">
                                <item.icon className="h-5 w-5 text-[#FF7A45] sm:h-7 sm:w-7" />
                            </div>

                            <h3 className="mt-3 break-words text-base font-bold sm:mt-6 sm:text-xl lg:text-2xl">
                                {item.title}
                            </h3>

                            <p className="mt-2 break-words text-sm leading-5 text-gray-600 sm:mt-4 sm:leading-7">
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
