import { useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import Badge from "../ui/Badge";

import useCart from "../../hooks/useCart";

const CartItem = ({ item }) => {

    const {
        updateItem,
        removeItem,
    } = useCart();

    const [loading, setLoading] = useState(false);

    const increase = async () => {

        if (item.quantity >= item.product.stock) return;

        try {

            setLoading(true);

            await updateItem(
                item.product._id,
                item.quantity + 1
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update cart."
            );

        } finally {

            setLoading(false);

        }

    };

    const decrease = async () => {

        if (item.quantity <= 1) return;

        try {

            setLoading(true);

            await updateItem(
                item.product._id,
                item.quantity - 1
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update cart."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleRemove = async () => {

        try {

            setLoading(true);

            await removeItem(
                item.product._id
            );

            toast.success(
                "Removed from cart."
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to remove."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="flex flex-col gap-6 rounded-card bg-surface p-6 shadow-card md:flex-row">

            <img
                src={item.product.images?.[0]?.url}
                alt={item.product.name}
                className="h-40 w-40 rounded-button bg-background object-contain p-4"
            />

            <div className="flex flex-1 flex-col">

                <div className="flex items-start justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-heading">

                            {item.product.name}

                        </h2>

                        <p className="mt-2 text-body">

                            {item.product.brand || "WonderFox"}

                        </p>

                    </div>

                    <Badge
                        variant={
                            item.product.stock > 0
                                ? "success"
                                : "danger"
                        }
                    >

                        {item.product.stock > 0
                            ? "In Stock"
                            : "Out of Stock"}

                    </Badge>

                </div>

                <p className="mt-4 text-3xl font-bold text-primary">

                    ₹{item.price}

                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">

                    <div className="flex items-center overflow-hidden rounded-button border">

                        <button
                            onClick={decrease}
                            disabled={loading}
                            className="px-4 py-2 hover:bg-gray-100"
                        >
                            −
                        </button>

                        <span className="border-x px-5 py-2">

                            {item.quantity}

                        </span>

                        <button
                            onClick={increase}
                            disabled={loading}
                            className="px-4 py-2 hover:bg-gray-100"
                        >
                            +
                        </button>

                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                    >

                        <Heart size={18} />

                        Save

                    </Button>

                    <Button
                        variant="danger"
                        size="sm"
                        disabled={loading}
                        onClick={handleRemove}
                    >

                        <Trash2 size={18} />

                        Remove

                    </Button>

                </div>

            </div>

        </div>

    );

};

export default CartItem;