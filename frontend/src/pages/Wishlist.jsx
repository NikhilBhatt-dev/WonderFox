import { useEffect, useState } from "react";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Container from "../component/common/Container";
import useCart from "../hooks/useCart";
import { getWishlist, removeFromWishlist } from "../services/wishlist.service";

const Wishlist = () => {
    const navigate = useNavigate();
    const { addItem } = useCart();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const readGuestWishlist = () => {
        try {
            const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    };

    const syncWishlist = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                const guestIds = readGuestWishlist();
                setItems(guestIds.map((id) => ({ _id: id })));
                return;
            }

            const response = await getWishlist();
            const wishlistItems = response?.items || [];
            const mapped = wishlistItems.map((entry) => entry.product || entry);
            setItems(mapped);
        } catch (error) {
            console.error(error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        syncWishlist();

        const handleWishlistSync = () => {
            syncWishlist();
        };

        window.addEventListener("wishlist:updated", handleWishlistSync);
        return () => window.removeEventListener("wishlist:updated", handleWishlistSync);
    }, []);

    const handleRemove = async (productId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            const next = readGuestWishlist().filter((id) => id !== productId);
            localStorage.setItem("wishlist", JSON.stringify(next));
            window.dispatchEvent(new CustomEvent("wishlist:updated"));
            setItems((prev) => prev.filter((item) => item._id !== productId));
            toast.success("Removed from wishlist.");
            return;
        }

        try {
            await removeFromWishlist(productId);
            toast.success("Removed from wishlist.");
            await syncWishlist();
        } catch (error) {
            toast.error(error.response?.data?.message || "Unable to remove from wishlist.");
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            await addItem(productId, 1);
            toast.success("Product added to cart.");
        } catch (error) {
            toast.error(error.response?.data?.message || "Please log in to add products to your cart.");
        }
    };

    if (loading) {
        return (
            <section className="bg-[#FFF8F3] py-10 sm:py-20">
                <Container>
                    <div className="flex h-64 items-center justify-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Loading Wishlist...</h2>
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section className="bg-[#FFF8F3] py-10 sm:py-20">
            <Container>
                <div className="mb-14 text-center">
                    <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-500">
                        MY Favorites
                    </span>
                    <h1 className="mt-5 text-3xl font-black text-gray-900 sm:text-5xl">My Wishlist</h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Save your favorite toys and buy them anytime.
                    </p>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-orange-200 bg-white p-10 text-center">
                        <h3 className="text-2xl font-bold text-gray-800">Your wishlist is empty.</h3>
                        <p className="mt-3 text-gray-500">Add products you love to save them here.</p>
                        <button
                            onClick={() => navigate("/collection")}
                            className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {items.map((product) => (
                            <div key={product._id} className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                <div className="relative overflow-hidden bg-[#FFF8F3]">
                                    <img
                                        src={product.images?.[0]?.url || product.image || "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"}
                                        alt={product.name}
                                        className="aspect-square w-full object-contain p-3 transition duration-500 group-hover:scale-110 sm:h-72 sm:aspect-auto sm:p-8"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => handleRemove(product._id)}
                                        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md"
                                        aria-label="Remove from wishlist"
                                    >
                                        <Heart size={20} fill="#FF7A45" className="text-[#FF7A45]" />
                                    </button>
                                </div>

                                <div className="p-3 sm:p-6">
                                    <div className="mb-2 flex flex-wrap items-center gap-0.5 text-yellow-400 sm:mb-3 sm:gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} fill="currentColor" className="sm:h-4 sm:w-4" />
                                        ))}
                                        <span className="ml-1 text-[10px] text-gray-500 sm:ml-2 sm:text-sm">(4.9)</span>
                                    </div>

                                    <h3 className="line-clamp-2 break-words text-sm font-bold text-gray-900 sm:text-2xl">{product.name}</h3>
                                    <p className="mt-2 text-xl font-bold text-orange-500">₹{product.price || product.discountPrice || 0}</p>

                                    <div className="mt-3 flex min-w-0 flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleAddToCart(product._id)}
                                            className="flex w-full items-center justify-center gap-1 rounded-xl bg-orange-500 py-2 text-xs font-semibold text-white transition hover:bg-orange-600 sm:flex-1 sm:gap-2 sm:py-3 sm:text-base"
                                        >
                                            <ShoppingBag size={18} />
                                            <span className="sm:hidden">Add</span><span className="hidden sm:inline">Add to Cart</span>
                                        </button>

                                        <Link
                                            to={`/product/${product._id}`}
                                            className="flex h-9 w-full items-center justify-center gap-1 rounded-xl border border-gray-200 text-xs transition hover:bg-gray-100 sm:h-12 sm:w-12 sm:gap-0 sm:text-base"
                                        >
                                            <Eye size={16} /><span className="sm:hidden">View</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
};

export default Wishlist;
