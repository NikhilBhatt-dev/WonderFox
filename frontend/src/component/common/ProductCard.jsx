import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import toyPlaceholder from "../../assets/image/toy-1.avif";
import RatingStars from "./RatingStars";
import useCart from "../../hooks/useCart";
import {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
} from "../../services/wishlist.service";

const ProductCard = ({ product }) => {
    const { addItem } = useCart();
    const [isWishlisted, setIsWishlisted] = useState(false);

    const syncWishlistState = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
                const inWishlist = savedWishlist.some((id) => id === product._id);
                setIsWishlisted(inWishlist);
                return;
            }

            const wishlist = await getWishlist();
            const wishlistItems = wishlist?.items || [];
            const inWishlist = wishlistItems.some(
                (item) => item?.product?._id === product._id || item?.product === product._id,
            );
            setIsWishlisted(inWishlist);
        } catch {
            setIsWishlisted(false);
        }
    };

    useEffect(() => {
        syncWishlistState();

        const handleWishlistSync = () => {
            syncWishlistState();
        };

        window.addEventListener("wishlist:updated", handleWishlistSync);

        return () => {
            window.removeEventListener("wishlist:updated", handleWishlistSync);
        };
    }, [product._id]);

    const notifyWishlistUpdated = () => {
        window.dispatchEvent(new CustomEvent("wishlist:updated"));
    };

    const handleWishlistToggle = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
                const nextWishlist = isWishlisted
                    ? savedWishlist.filter((id) => id !== product._id)
                    : [...new Set([...savedWishlist, product._id])];

                localStorage.setItem("wishlist", JSON.stringify(nextWishlist));
                setIsWishlisted(!isWishlisted);
                notifyWishlistUpdated();
                toast.success(
                    isWishlisted ? "Removed from wishlist." : "Added to wishlist.",
                );
                return;
            }

            if (isWishlisted) {
                await removeFromWishlist(product._id);
                toast.success("Removed from wishlist.");
            } else {
                await addToWishlist(product._id);
                toast.success("Added to wishlist.");
            }

            setIsWishlisted(!isWishlisted);
            notifyWishlistUpdated();
        } catch (error) {
            const message = error.response?.data?.message || "Unable to update wishlist.";
            toast.error(message);
        }
    };

    const handleAddToCart = async () => {
        try {
            await addItem(product._id, 1);
            toast.success("Product added to cart.");
        } catch (error) {
            toast.error(error.response?.data?.message || "Please log in to add products to your cart.");
        }
    };

    return (
        <div className="group relative flex h-full min-w-0 flex-col rounded-3xl border border-orange-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5">

            {/* Featured Badge */}

            {product.isFeatured && (
                <span className="absolute left-5 top-5 z-20 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                    Featured
                </span>
            )}

            {/* Right Icons */}

            <div className="absolute right-5 top-5 z-20 flex flex-col gap-3">

                <button
                    type="button"
                    onClick={handleWishlistToggle}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    className={`flex h-10 w-10 items-center justify-center rounded-full shadow transition-all duration-300 hover:scale-110 ${isWishlisted ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-orange-500 hover:text-white"}`}
                >
                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>

                <Link
                    to={`/product/${product._id}`}
                    className="flex h-10 w-10 translate-x-16 items-center justify-center rounded-full bg-white shadow opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 hover:bg-orange-500 hover:text-white"
                >
                    <Eye size={18} />
                </Link>

            </div>


            {/* Product */}

            <Link
                to={`/product/${product._id}`}
                className="flex flex-1 flex-col"
            >

                {/* Product Image */}

                <div className="flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#FFF8F3] p-4 sm:h-64 sm:aspect-auto sm:p-5">

                    <img
                        src={
                            product.images?.[0]?.url ||
                            toyPlaceholder
                        }
                        alt={product.name}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />

                </div>


                {/* Rating */}

                <div className="mt-5 flex min-w-0 flex-wrap items-center gap-1">

                    <RatingStars rating={product.rating} />

                    <span className="text-sm text-gray-500 sm:ml-2">
                        {Number(product.rating || 0).toFixed(1)} ({product.numReviews || 0})
                    </span>

                </div>


                {/* Product Name */}

                <h3 className="mt-3 break-words text-lg font-semibold leading-6 text-gray-800 transition-colors duration-300 group-hover:text-orange-500 sm:min-h-[56px] sm:text-xl sm:leading-7">
                    {product.name}
                </h3>


                {/* Price */}

                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">

                    <span className="text-xl font-bold text-orange-500 sm:text-2xl">
                        ₹{product.discountPrice || product.price}
                    </span>

                    {product.discountPrice > 0 && (
                        <span className="text-sm text-gray-400 line-through">
                            ₹{product.price}
                        </span>
                    )}

                </div>

            </Link>


            {/* Add To Cart */}

            <button
                type="button"
                onClick={handleAddToCart}
                className="mt-6 flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-orange-500 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-orange-600"
            >

                <ShoppingCart size={20} />

                Add To Cart

            </button>

        </div>
    );
};

export default ProductCard;
