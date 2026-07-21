import { Heart, ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ product }) => {
    return (
        <div className="group rounded-3xl bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

            <button className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <Heart size={18} />
            </button>

            <img
                src={product.image}
                alt={product.name}
                className="mx-auto h-56 object-contain transition duration-300 group-hover:scale-110"
            />

            <h3 className="mt-5 text-xl font-semibold">
                {product.name}
            </h3>

            <div className="mt-2 flex items-center gap-1">
                <Star size={16} fill="orange" />
                <span>{product.rating}</span>
            </div>

            <div className="mt-4 flex items-center justify-between">

                <span className="text-2xl font-bold">
                    ₹{product.price}
                </span>

                <button className="rounded-xl bg-orange-500 p-3 text-white">
                    <ShoppingCart size={18} />
                </button>

            </div>

        </div>
    );
};

export default ProductCard;