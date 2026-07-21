import features from "../../data/features";
import FeatureCard from "../common/FeatureCard";

const WhyChooseUs = () => {
    return (
        <section className="bg-[#FFF8F3] py-20">

            <div className="mx-auto max-w-7xl px-6">

                <h2 className="text-center text-5xl font-bold">
                    Why Choose Us
                </h2>

                <p className="mt-4 text-center text-gray-500">
                    We make every purchase joyful and memorable.
                </p>

                <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.id}
                            feature={feature}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
};

export default WhyChooseUs;