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
import { buildLoginRedirectUrl } from "../../utils/authGuard";

const ProductInfo = ({ product }) => {

    const navigate = useNavigate();

    const { addItem } = useCart();

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(false);

    /* =========================
       Discount Price Logic
    ========================= */

    const hasDiscount =
        Number(product.discountPrice) > 0 &&
        Number(product.discountPrice) < Number(product.price);

    const discount = hasDiscount
        ? Math.round(
            ((Number(product.price) - Number(product.discountPrice)) /
                Number(product.price)) *
            100
        )
        : 0;

    const finalPrice = hasDiscount
        ? Number(product.discountPrice)
        : Number(product.price);

    /* =========================
       Add To Cart
    ========================= */

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

    /* =========================
       Buy Now
    ========================= */

    const handleBuyNow = async () => {

        if (!localStorage.getItem("token")) {

            toast.error("Please log in to continue.");

            navigate(buildLoginRedirectUrl());

            return;

        }

        await handleAddToCart();

        navigate("/cart");

    };

    return (

        <div className="min-w-0 space-y-6 sm:space-y-8">

            {/* Featured Badge */}

            {product.isFeatured && (

                <Badge variant="warning">

                    ⭐ Featured Product

                </Badge>

            )}

            {/* Product Name + Rating */}

            <div>

                <h1 className="break-words text-3xl font-bold text-heading sm:text-4xl">

                    {product.name}

                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-2">

                    <RatingStars
                        rating={product.rating}
                        size={18}
                    />

                    <span className="text-body">

                        {Number(product.rating || 0).toFixed(1)}
                        {" "}
                        ({product.numReviews || 0} Reviews)

                    </span>

                </div>

            </div>

            {/* Product Badges */}

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

            {/* =========================
                Product Price
            ========================= */}

            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">

                {/* Final / Selling Price */}

                <span className="break-all text-3xl font-bold text-primary sm:text-5xl">

                    ₹{finalPrice}

                </span>

                {/* Original Price */}

                {hasDiscount && (

                    <>

                        <span className="text-2xl text-gray-400 line-through">

                            ₹{product.price}

                        </span>

                        {/* Discount Percentage */}

                        <Badge variant="danger">

                            {discount}% OFF

                        </Badge>

                    </>

                )}

            </div>

            {/* Product Description */}

            <p className="break-words leading-8 text-body">

                {product.description}

            </p>

            {/* Quantity */}

            <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                stock={product.stock}
            />

            {/* Action Buttons */}

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">

                {/* Add To Cart */}

                <Button
                    className="w-full sm:flex-1"
                    onClick={handleAddToCart}
                    disabled={
                        loading ||
                        product.stock <= 0
                    }
                >

                    <ShoppingCart size={20} />

                    {loading
                        ? "Adding..."
                        : "Add To Cart"}

                </Button>

                {/* Buy Now */}

                <Button
                    variant="secondary"
                    className="w-full sm:flex-1"
                    onClick={handleBuyNow}
                    disabled={
                        loading ||
                        product.stock <= 0
                    }
                >

                    <Zap size={20} />

                    Buy Now

                </Button>

                {/* Wishlist */}

                <Button
                    variant="outline"
                    className="self-start sm:self-auto"
                >

                    <Heart size={20} />

                </Button>

            </div>

            {/* Service Information */}

            <div className="space-y-4 rounded-card bg-surface p-4 shadow-card sm:p-6">

                <div className="flex items-center gap-3 break-words">

                    <ShieldCheck
                        className="text-accent"
                        size={22}
                    />

                    <span className="text-body">

                        100% Secure Payment

                    </span>

                </div>

                <div className="flex items-center gap-3 break-words">

                    <Truck
                        className="text-primary"
                        size={22}
                    />

                    <span className="text-body">

                        Fast Delivery Across India

                    </span>

                </div>

                <div className="flex items-center gap-3 break-words">

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
