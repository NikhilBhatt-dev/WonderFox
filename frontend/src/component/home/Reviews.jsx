import testimonials from "../../data/testimonials";
import TestimonialCard from "../common/TestimonialCard";

const Reviews = () => {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">

                <h2 className="text-center text-5xl font-bold">
                    What Our Customers Say
                </h2>

                <p className="mt-4 text-center text-gray-500">
                    Trusted by thousands of happy families.
                </p>

                <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Reviews;