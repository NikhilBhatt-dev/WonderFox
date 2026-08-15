import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Heart,
    ShoppingCart,
    Zap,
    ShieldCheck,
    Truck,
} from "lucide-react";
import toast from "react-hot-toast";

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import QuantitySelector from "./QuantitySelector";
import RatingStars from "../common/RatingStars";

import useCart from "../../hooks/useCart";

const ProductInfo = ({ product }) => {

    const navigate = useNavigate();

    const { addItem } = useCart();

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(false);

    const discount =
        product.discountPrice > product.price
            ? Math.round(
                ((product.discountPrice - product.price) /
                    product.discountPrice) *
                100
            )
            : 0;

    const handleAddToCart = async () => {

        if (product.stock <= 0) {

            toast.error("Product is out of stock.");

            return;

        }

        try {

            setLoading(true);

            await addItem(
                product._id,
                quantity
            );

            toast.success("Product added to cart.");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add product."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleBuyNow = async () => {

        await handleAddToCart();

        navigate("/cart");

    };

    return (

        <div className="space-y-8">

            {product.isFeatured && (

                <Badge variant="warning">

                    ⭐ Featured Product

                </Badge>

            )}

            <div>

                <h1 className="text-4xl font-bold text-heading">

                    {product.name}

                </h1>

                <div className="mt-4 flex items-center gap-2">

                    <RatingStars rating={product.rating} size={18} />

                    <span className="text-body">

                        {Number(product.rating || 0).toFixed(1)} ({product.numReviews || 0} Reviews)

                    </span>

                </div>

            </div>

            <div className="flex flex-wrap gap-3">

                {product.brand && (

                    <Badge variant="info">

                        Brand : {product.brand}

                    </Badge>

                )}

                <Badge
                    variant={
                        product.stock > 0
                            ? "success"
                            : "danger"
                    }
                >

                    {product.stock > 0
                        ? "In Stock"
                        : "Out of Stock"}

                </Badge>

                {product.category?.name && (

                    <Badge>

                        {product.category.name}

                    </Badge>

                )}

            </div>

            <div className="flex items-end gap-4">

                <span className="text-5xl font-bold text-primary">

                    ₹{product.price}

                </span>

                {discount > 0 && (

                    <>
                        <span className="text-2xl text-gray-400 line-through">

                            ₹{product.discountPrice}

                        </span>

                        <Badge variant="danger">

                            {discount}% OFF

                        </Badge>
                    </>

                )}

            </div>

            <p className="leading-8 text-body">

                {product.description}

            </p>

            <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                stock={product.stock}
            />

            <div className="flex flex-wrap gap-4">

                <Button
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={loading || product.stock <= 0}
                >

                    <ShoppingCart size={20} />

                    {loading
                        ? "Adding..."
                        : "Add To Cart"}

                </Button>

                <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={handleBuyNow}
                    disabled={loading || product.stock <= 0}
                >

                    <Zap size={20} />

                    Buy Now

                </Button>

                <Button
                    variant="outline"
                >

                    <Heart size={20} />

                </Button>

            </div>

            <div className="space-y-4 rounded-card bg-surface p-6 shadow-card">

                <div className="flex items-center gap-3">

                    <ShieldCheck
                        className="text-accent"
                        size={22}
                    />

                    <span className="text-body">

                        100% Secure Payment

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <Truck
                        className="text-primary"
                        size={22}
                    />

                    <span className="text-body">

                        Fast Delivery Across India

                    </span>

                </div>

                <div className="flex items-center gap-3">

                    🎁

                    <span className="text-body">

                        Premium Quality Plush Toys

                    </span>

                </div>

            </div>

        </div>

    );

};

export default ProductInfo;
