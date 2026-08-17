import {
    MapPin,
    Phone,
    Mail,
    Clock,
} from "lucide-react";

const contactDetails = [
    {
        icon: MapPin,
        title: "Visit Us",
        value: "123 Toy Street, Sector 18, Noida, Uttar Pradesh 201301",
    },
    {
        icon: Phone,
        title: "Call Us",
        value: "+91 98765 43210",
    },
    {
        icon: Mail,
        title: "Email Us",
        value: "hello@wonderfox.in",
    },
    {
        icon: Clock,
        title: "Working Hours",
        value: "Mon – Sat | 10:00 AM – 7:00 PM",
    },
];

const ContactInfo = () => {
    return (
        <section className="bg-white py-12 sm:py-24">
            <div className="container mx-auto px-5">

                <div className="text-center max-w-3xl mx-auto">

                    <span className="uppercase tracking-[4px] text-orange-500 font-semibold text-sm">
                        Get In Touch
                    </span>

                    <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-5xl">
                        We'd Love To Hear From You
                    </h2>

                    <p className="mt-6 text-lg text-gray-600 leading-8">
                        Whether you have a question about our products, your order,
                        or simply want to say hello, we're always happy to help.
                    </p>

                </div>

                <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {contactDetails.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl border border-gray-100 bg-[#FAF5EC] p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8"
                        >
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                                <item.icon size={30} className="text-[#FF7A45]" />
                            </div>

                            <h3 className="mt-6 text-xl font-bold text-gray-900">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-gray-600 leading-7">
                                {item.value}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default ContactInfo;
