import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import toyPlaceholder from "../../assets/image/toy-1.avif";

const ProductCard = ({ product }) => {
    return (
        <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

        
            {/* badges */}
            {product.isFeatured && (
                <span className="absolute left-5 top-5 z-20 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                    Featured
                </span>
            )}

            {/* Right Icons */}
            <div className="absolute right-5 top-5 z-20 flex flex-col gap-3">

                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition-all duration-300 hover:scale-110 hover:bg-orange-500 hover:text-white">
                    <Heart size={18} />
                </button>

                <button className="translate-x-16 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 hover:bg-orange-500 hover:text-white">
                    <Eye size={18} />
                </button>

            </div>

            {/* Product Image */}

            <Link to={`/product/${product._id}`}>
            <div className="overflow-hidden rounded-2xl bg-[#FFF8F3] p-5">

                <img
                        src={product.images?.[0]?.url || toyPlaceholder}
                    alt={product.name}
                    className="mx-auto h-64 w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />

            </div>

            {/* Rating */}

            <div className="mt-5 flex items-center gap-1">

                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        size={16}
                        fill="#F59E0B"
                        stroke="#F59E0B"
                    />
                ))}

                <span className="ml-2 text-sm text-gray-500">
                        ({product.rating || 0})
                </span>

            </div>

            {/* Product Name */}

            <h3 className="mt-3 text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-orange-500">
                {product.name}
            </h3>


            {/* Price */}

                <div className="mt-3 flex items-center gap-3">

                    <span className="text-2xl font-bold text-orange-500">
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

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-orange-600">

                <ShoppingCart size={20} />

                Add To Cart

            </button>

        </div>
    );
};

export default ProductCard;