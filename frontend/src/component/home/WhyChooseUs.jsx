import features from "../../data/features";

import Container from "../common/Container";
import FeatureCard from "../common/FeatureCard";
import SectionHeading from "../common/SectionHeading";

const WhyChooseUs = () => {
    return (
        <section className="bg-[#FFF8F3] py-20">

            <Container>

                <SectionHeading
                    badge="Why WonderFox"
                    title="Why Choose Us?"
                    subtitle="We make shopping for kids fun, safe and memorable."
                />

                <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">

                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.id}
                            feature={feature}
                        />
                    ))}

                </div>

            </Container>

        </section>
    );
};

export default WhyChooseUs;
