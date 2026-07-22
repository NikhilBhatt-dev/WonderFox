import testimonials from "../../data/testimonials";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import TestimonialCard from "../common/TestimonialCard";

const Reviews = () => {
    return (
        <section className="bg-white py-20">

            <Container>

                <SectionHeading
                    badge="Testimonials"
                    title="What Parents Say"
                    subtitle="Loved by thousands of happy families."
                />

                <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {testimonials.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                        />
                    ))}

                </div>

            </Container>

        </section>
    );
};

export default Reviews;