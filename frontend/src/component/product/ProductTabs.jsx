import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import RatingStars from "../common/RatingStars";
import { getProductReviews, saveProductReview } from "../../services/product.service";

const tabs = ["Description", "Specifications", "Reviews"];

const ProductTabs = ({ product, onProductUpdated }) => {
    const [activeTab, setActiveTab] = useState("Description");
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(false);
    const [reviewRating, setReviewRating] = useState(5);
    const [comment, setComment] = useState("");
    const [savingReview, setSavingReview] = useState(false);
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    useEffect(() => {
        if (activeTab !== "Reviews") return;
        const loadReviews = async () => {
            try {
                setLoadingReviews(true);
                setReviews(await getProductReviews(product._id));
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to load reviews.");
            } finally {
                setLoadingReviews(false);
            }
        };
        loadReviews();
    }, [activeTab, product._id]);

    const handleSubmitReview = async (event) => {
        event.preventDefault();
        try {
            setSavingReview(true);
            const data = await saveProductReview(product._id, { rating: reviewRating, comment });
            setReviews((current) => current.some((review) => review._id === data.review._id)
                ? current.map((review) => review._id === data.review._id ? data.review : review)
                : [data.review, ...current]);
            onProductUpdated(data.product);
            setComment("");
            toast.success("Your review has been saved.");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save review.");
        } finally {
            setSavingReview(false);
        }
    };

    return (
        <div className="mt-12 min-w-0 rounded-card bg-surface p-4 shadow-card sm:mt-20 sm:p-8">
            <div className="mb-6 flex flex-wrap gap-2 border-b pb-4 sm:mb-8 sm:gap-4">
                {tabs.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-button px-4 py-2 text-sm font-medium transition sm:px-5 sm:text-base ${activeTab === tab ? "bg-primary text-white" : "bg-gray-100 text-body hover:bg-gray-200"}`}>{tab}</button>)}
            </div>

            {activeTab === "Description" && <div><h3 className="mb-4 text-2xl font-bold text-heading">Product Description</h3><p className="leading-8 text-body">{product.description}</p></div>}

            {activeTab === "Specifications" && <div><h3 className="mb-4 text-2xl font-bold text-heading">Specifications</h3><div className="overflow-x-auto rounded-button border"><table className="w-full min-w-[360px]"><tbody>
                <tr className="border-b"><td className="bg-gray-50 p-4 font-semibold">Brand</td><td className="p-4">{product.brand}</td></tr>
                <tr className="border-b"><td className="bg-gray-50 p-4 font-semibold">Category</td><td className="p-4">{product.category?.name}</td></tr>
                <tr className="border-b"><td className="bg-gray-50 p-4 font-semibold">Stock</td><td className="p-4">{product.stock}</td></tr>
                <tr><td className="bg-gray-50 p-4 font-semibold">Rating</td><td className="p-4">{Number(product.rating || 0).toFixed(1)} / 5 ({product.numReviews || 0} reviews)</td></tr>
            </tbody></table></div></div>}

            {activeTab === "Reviews" && <div>
                <h3 className="mb-4 text-2xl font-bold text-heading">Customer Reviews</h3>
                {isLoggedIn ? <form onSubmit={handleSubmitReview} className="mb-8 rounded-button bg-background p-4 sm:p-6">
                    <label className="mb-2 block font-semibold text-heading">Your rating</label>
                    <div className="mb-4 flex gap-1">{[1, 2, 3, 4, 5].map((rating) => <button key={rating} type="button" onClick={() => setReviewRating(rating)} aria-label={`Rate ${rating} out of 5`} className="rounded p-1 text-amber-400 transition hover:scale-110"><Star size={24} fill={rating <= reviewRating ? "currentColor" : "none"} /></button>)}</div>
                    <label htmlFor="review-comment" className="mb-2 block font-semibold text-heading">Review (optional)</label>
                    <textarea id="review-comment" value={comment} onChange={(event) => setComment(event.target.value)} maxLength="1000" rows="3" className="w-full rounded-button border border-gray-300 p-3 text-body outline-none focus:border-orange-500" placeholder="Tell other customers about this product" />
                    <button type="submit" disabled={savingReview} className="mt-4 rounded-button bg-primary px-5 py-2 font-semibold text-white disabled:opacity-60">{savingReview ? "Saving..." : "Submit review"}</button>
                </form> : <p className="mb-8 rounded-button bg-background p-4 text-body">Please log in to add or update your review.</p>}

                {loadingReviews ? <p className="text-body">Loading reviews...</p> : reviews.length === 0 ? <p className="rounded-button bg-background p-8 text-center text-body">No reviews yet. Be the first to rate this product.</p> : <div className="space-y-4">
                    {reviews.map((review) => <article key={review._id} className="rounded-button border p-5"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold text-heading">{review.user?.name || "Customer"}</p><RatingStars rating={review.rating} /></div>{review.comment && <p className="mt-3 text-body">{review.comment}</p>}</article>)}
                </div>}
            </div>}
        </div>
    );
};

export default ProductTabs;
