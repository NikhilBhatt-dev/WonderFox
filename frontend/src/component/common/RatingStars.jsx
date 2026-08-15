import { Star } from "lucide-react";

const RatingStars = ({ rating = 0, size = 16 }) => {
    const safeRating = Math.min(5, Math.max(0, Number(rating) || 0));

    return (
        <div
            className="flex items-center gap-0.5 text-amber-400"
            aria-label={`${safeRating.toFixed(1)} out of 5 stars`}
        >
            {[0, 1, 2, 3, 4].map((index) => (
                <Star
                    key={index}
                    size={size}
                    fill={index < Math.round(safeRating) ? "currentColor" : "none"}
                    stroke="currentColor"
                />
            ))}
        </div>
    );
};

export default RatingStars;
