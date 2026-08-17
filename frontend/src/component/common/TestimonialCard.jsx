import { Star } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="min-w-0 rounded-3xl bg-white p-3 shadow-md sm:p-5 lg:p-6">

            <div className="mb-2 flex gap-px sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                        key={i}
                        size={12}
                        className="sm:h-[18px] sm:w-[18px]"
                        fill="#F59E0B"
                        stroke="#F59E0B"
                    />
                ))}
            </div>

            <p className="line-clamp-5 break-words text-xs leading-5 text-gray-600 sm:text-base sm:leading-normal">
                "{testimonial.review}"
            </p>

            <div className="mt-3 sm:mt-6">
                <h4 className="break-words text-xs font-semibold sm:text-base">
                    {testimonial.name}
                </h4>

                <p className="break-words text-[10px] text-gray-500 sm:text-sm">
                    {testimonial.role}
                </p>
            </div>

        </div>
    );
};

export default TestimonialCard;
