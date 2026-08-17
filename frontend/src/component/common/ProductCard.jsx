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
                <span className="absolute left-3 top-3 z-20 rounded-full bg-orange-500 px-2 py-1 text-[10px] font-semibold text-white sm:left-5 sm:top-5 sm:px-3 sm:text-xs">
                    Featured
                </span>
            )}

            {/* Right Icons */}

            <div className="absolute right-3 top-3 z-20 flex flex-col gap-2 sm:right-5 sm:top-5 sm:gap-3">

                <button
                    type="button"
                    onClick={handleWishlistToggle}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    className={`flex h-8 w-8 items-center justify-center rounded-full shadow transition-all duration-300 hover:scale-110 sm:h-10 sm:w-10 ${isWishlisted ? "bg-orange-500 text-white" : "bg-white text-gray-700 hover:bg-orange-500 hover:text-white"}`}
                >
                    <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                </button>

                <Link
                    to={`/product/${product._id}`}
                    className="hidden h-10 w-10 translate-x-16 items-center justify-center rounded-full bg-white shadow opacity-0 transition-all duration-500 hover:bg-orange-500 hover:text-white sm:flex sm:group-hover:translate-x-0 sm:group-hover:opacity-100"
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

                <div className="flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#FFF8F3] p-2 sm:h-64 sm:aspect-auto sm:p-5">

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

                <div className="mt-3 flex min-w-0 flex-wrap items-center gap-0.5 sm:mt-5 sm:gap-1">

                    <RatingStars rating={product.rating} />

                    <span className="text-[10px] text-gray-500 sm:ml-2 sm:text-sm">
                        {Number(product.rating || 0).toFixed(1)} ({product.numReviews || 0})
                    </span>

                </div>


                {/* Product Name */}

                <h3 className="mt-2 line-clamp-2 break-words text-sm font-semibold leading-5 text-gray-800 transition-colors duration-300 group-hover:text-orange-500 sm:mt-3 sm:min-h-[56px] sm:text-xl sm:leading-7">
                    {product.name}
                </h3>


                {/* Price */}

                <div className="mt-2 flex flex-wrap items-baseline gap-x-1 gap-y-0.5 sm:mt-3 sm:gap-x-3 sm:gap-y-1">

                    <span className="text-base font-bold text-orange-500 sm:text-2xl">
                        ₹{product.discountPrice || product.price}
                    </span>

                    {product.discountPrice > 0 && (
                        <span className="text-[10px] text-gray-400 line-through sm:text-sm">
                            ₹{product.price}
                        </span>
                    )}

                </div>

            </Link>


            {/* Add To Cart */}

            <button
                type="button"
                onClick={handleAddToCart}
                className="mt-4 flex h-10 w-full shrink-0 items-center justify-center gap-1 rounded-xl bg-orange-500 text-xs font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-orange-600 sm:mt-6 sm:h-12 sm:gap-2 sm:rounded-2xl sm:text-base"
            >

                <ShoppingCart size={16} className="sm:hidden" />
                <ShoppingCart size={20} className="hidden sm:block" />

                Add To Cart

            </button>

        </div>
    );
};

export default ProductCard;
