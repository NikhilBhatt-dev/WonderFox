import { Star } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="rounded-3xl bg-white p-6 shadow-md">

            <div className="mb-4 flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                        key={i}
                        size={18}
                        fill="#F59E0B"
                        stroke="#F59E0B"
                    />
                ))}
            </div>

            <p className="text-gray-600">
                "{testimonial.review}"
            </p>

            <div className="mt-6">
                <h4 className="font-semibold">
                    {testimonial.name}
                </h4>

                <p className="text-sm text-gray-500">
                    {testimonial.role}
                </p>
            </div>

        </div>
    );
};

export default TestimonialCard;