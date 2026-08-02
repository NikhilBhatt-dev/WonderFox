import products from "../data/Products";

import Container from "../component/common/Container";

import CartItem from "../component/cart/CartItem";
import CartSummary from "../component/cart/CartSummary";
import EmptyCart from "../component/cart/EmptyCart";

const Cart = () => {

    // Temporary Data
    
    const cartItems = products.slice(0, 2);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price,
        0
    );

    if (cartItems.length === 0) {

        return (

            <section className="bg-background py-16">

                <Container>

                    <EmptyCart />

                </Container>

            </section>

        );

    }

    return (

        <section className="bg-background py-16">

            <Container>

                {/* Header */}

                <div className="mb-12 text-center">

                    <h1 className="text-4xl font-bold text-heading">

                        Shopping Cart

                    </h1>

                    <p className="mt-4 text-body">

                        Review your selected products before checkout.

                    </p>

                </div>

                <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

                    {/* Cart Items */}

                    <div className="space-y-6">

                        {cartItems.map((item) => (

                            <CartItem
                                key={item.id}
                                item={item}
                            />

                        ))}

                    </div>

                    {/* Order Summary */}

                    <CartSummary
                        subtotal={subtotal}
                    />

                </div>

            </Container>

        </section>

    );

};

export default Cart;