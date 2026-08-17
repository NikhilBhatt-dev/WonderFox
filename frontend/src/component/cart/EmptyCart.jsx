import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../ui/Button";

const EmptyCart = () => {

    return (

        <div className="py-24 text-center">

            <ShoppingCart
                size={80}
                className="mx-auto text-primary"
            />

            <h2 className="mt-6 text-3xl font-bold text-heading">
                Your Cart is Empty
            </h2>

            <p className="mt-3 text-body">
                Looks like you haven't added any toys yet.
            </p>

            <Link to="/collection">
    <Button className="mt-8">
        Continue Shopping
    </Button>
</Link>
            

        </div>

    );

};

export default EmptyCart;