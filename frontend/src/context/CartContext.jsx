import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
    getCart,
    addToCart,
    updateCart,
    removeFromCart,
} from "../services/cart.service";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState({
        items: [],
        totalAmount: 0,
    });

    const [loading, setLoading] = useState(false);

    const fetchCart = async () => {

        try {

            setLoading(true);

            const response = await getCart();

            if (response?.cart) {

                setCart(response.cart);

            } else {

                setCart({
                    items: response.items || [],
                    totalAmount: response.totalAmount || 0,
                });

            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCart();

    }, []);

    const addItem = async (productId, quantity = 1) => {

        const response = await addToCart({
            productId,
            quantity,
        });

        setCart(response.data.cart);

    };

    const updateItem = async (productId, quantity) => {

        const cart = await updateCart(productId, quantity);

        setCart(cart);

    };

    const removeItem = async (productId) => {

        const cart = await removeFromCart(productId);

        setCart(cart);

    };

    const cartCount = useMemo(() => {

        return cart.items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

    }, [cart]);

    return (

        <CartContext.Provider
            value={{
                cart,
                cartCount,
                loading,
                fetchCart,
                addItem,
                updateItem,
                removeItem,
            }}
        >

            {children}

        </CartContext.Provider>

    );

};

export const useCart = () => useContext(CartContext);