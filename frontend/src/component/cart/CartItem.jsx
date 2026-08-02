import { Heart, Trash2 } from "lucide-react";

import Button from "../ui/Button";
import Badge from "../ui/Badge";

const CartItem = ({ item }) => {

    return (

        <div className="flex flex-col gap-6 rounded-card bg-surface p-6 shadow-card md:flex-row">

            <img
                src={item.image}
                alt={item.name}
                className="h-40 w-40 rounded-button bg-background object-contain p-4"
            />

            <div className="flex flex-1 flex-col">

                <div className="flex items-start justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-heading">

                            {item.name}

                        </h2>

                        <p className="mt-2 text-body">

                            WonderFox

                        </p>

                    </div>

                    <Badge variant="success">

                        In Stock

                    </Badge>

                </div>

                <p className="mt-4 text-3xl font-bold text-primary">

                    ₹{item.price}

                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">

                    <div className="flex items-center overflow-hidden rounded-button border">

                        <button className="px-4 py-2 hover:bg-gray-100">
                            −
                        </button>

                        <span className="border-x px-5 py-2">
                            1
                        </span>

                        <button className="px-4 py-2 hover:bg-gray-100">
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