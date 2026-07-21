const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="rounded-3xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

            <img
                src={testimonial.image}
                alt={testimonial.name}
                className="mx-auto h-20 w-20 rounded-full object-cover"
            />

            <p className="mt-6 text-center text-gray-600">
                "{testimonial.review}"
            </p>

            <h3 className="mt-5 text-center text-xl font-bold">
                {testimonial.name}
            </h3>

            <p className="text-center text-sm text-orange-500">
                {testimonial.role}
            </p>

        </div>
    );
};

export default TestimonialCard;