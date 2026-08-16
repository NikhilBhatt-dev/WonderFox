import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    getCart,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart as clearCartService,
} from "../services/cart.service";
import { getProduct } from "../services/product.service";

const GUEST_CART_KEY = "guestCart";

const normalizeGuestItem = (item) => {
    const product = item.product || {};
    const productId = item.productId || product._id || item._id;
    const price = Number(product.price ?? item.price ?? 0);

    return {
        product: {
            _id: productId,
            name: product.name || item.name || "Product",
            price,
            discountPrice: Number(product.discountPrice ?? item.discountPrice ?? price),
            images: product.images || item.images || [],
            stock: Number(product.stock ?? item.stock ?? 0),
        },
        quantity: Number(item.quantity || 1),
        price,
    };
};

const readGuestCart = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
        if (!Array.isArray(saved)) return [];
        return saved.map(normalizeGuestItem);
    } catch {
        return [];
    }
};

const writeGuestCart = (items) => {
    const safeItems = Array.isArray(items) ? items : [];
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(safeItems));
    window.dispatchEvent(new CustomEvent("cart:updated"));
    return safeItems;
};

const buildGuestCartState = (items) => ({
    items: Array.isArray(items) ? items : [],
    totalAmount: (Array.isArray(items) ? items : []).reduce(
        (sum, item) => sum + Number(item.price || item.product?.price || 0) * Number(item.quantity || 1),
        0,
    ),
});

const resolveGuestProductSnapshot = async (productId) => {
    if (typeof productId !== "string") {
        return {
            _id: productId?._id || "",
            name: productId?.name || "Product",
            price: Number(productId?.price || 0),
            discountPrice: Number(productId?.discountPrice || productId?.price || 0),
            images: productId?.images || [],
            stock: Number(productId?.stock || 0),
        };
    }

    try {
        const product = await getProduct(productId);
        return {
            _id: product._id,
            name: product.name,
            price: Number(product.price || 0),
            discountPrice: Number(product.discountPrice || product.price || 0),
            images: product.images || [],
            stock: Number(product.stock || 0),
        };
    } catch {
        return {
            _id: productId,
            name: "Product",
            price: 0,
            discountPrice: 0,
            images: [],
            stock: 0,
        };
    }
};


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [], totalAmount: 0 });
    const [loading, setLoading] = useState(false);

    const fetchCart = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setCart(buildGuestCartState(readGuestCart()));
            return;
        }

        try {
            setLoading(true);
            const cartData = await getCart();
            setCart(cartData || { items: [], totalAmount: 0 });
        } catch (error) {
            console.error(error);
            setCart({ items: [], totalAmount: 0 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();

        const handleCartSync = () => {
            if (!localStorage.getItem("token")) {
                setCart(buildGuestCartState(readGuestCart()));
            }
        };

        window.addEventListener("cart:updated", handleCartSync);

        return () => {
            window.removeEventListener("cart:updated", handleCartSync);
        };
    }, []);

    const addItem = async (productId, quantity = 1) => {
        const token = localStorage.getItem("token");

        if (!token) {
            const productSnapshot = await resolveGuestProductSnapshot(productId);
            const guestItems = readGuestCart();
            const targetId = productSnapshot._id || productId;
            const nextItems = [...guestItems];
            const index = nextItems.findIndex(
                (item) => (item.product?._id || item.productId) === targetId,
            );

            if (index >= 0) {
                nextItems[index].quantity = Number(nextItems[index].quantity || 1) + Number(quantity || 1);
                nextItems[index].product = {
                    ...nextItems[index].product,
                    ...productSnapshot,
                };
                nextItems[index].price = Number(productSnapshot.price || nextItems[index].price || 0);
            } else {
                nextItems.push({
                    productId: targetId,
                    product: productSnapshot,
                    quantity: Number(quantity || 1),
                    price: Number(productSnapshot.price || 0),
                    name: productSnapshot.name,
                    images: productSnapshot.images || [],
                });
            }

            const normalized = nextItems.map(normalizeGuestItem);
            const state = buildGuestCartState(normalized);
            writeGuestCart(normalized);
            setCart(state);
            return { data: { cart: state } };
        }

        const response = await addToCart({ productId, quantity });
        setCart(response.data.cart);
        return response;
    };

    const updateItem = async (productId, quantity) => {
        const token = localStorage.getItem("token");

        if (!token) {
            const guestItems = readGuestCart();
            const existing = guestItems.find((item) => (item.product?._id || item.productId) === productId);

            if (!existing) {
                return buildGuestCartState(guestItems);
            }

            const productSnapshot = await resolveGuestProductSnapshot(productId);
            const nextItems = guestItems
                .filter((item) => (item.product?._id || item.productId) !== productId)
                .concat({
                    productId,
                    product: productSnapshot,
                    quantity: Number(quantity || 1),
                    price: Number(productSnapshot.price || existing.price || 0),
                    name: productSnapshot.name,
                    images: productSnapshot.images || [],
                });

            const result = buildGuestCartState(nextItems.map(normalizeGuestItem));
            writeGuestCart(nextItems.map(normalizeGuestItem));
            setCart(result);
            return result;
        }

        const cartData = await updateCart(productId, quantity);
        setCart(cartData);
        return cartData;
    };

    const removeItem = async (productId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            const guestItems = readGuestCart().filter(
                (item) => (item.product?._id || item.productId) !== productId,
            );
            const result = buildGuestCartState(guestItems);
            writeGuestCart(guestItems);
            setCart(result);
            return result;
        }

        const cartData = await removeFromCart(productId);
        setCart(cartData);
        return cartData;
    };


    const clearCart = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            localStorage.removeItem(GUEST_CART_KEY);
            const emptyState = { items: [], totalAmount: 0 };
            setCart(emptyState);
            window.dispatchEvent(new CustomEvent("cart:updated"));
            return emptyState;
        }

        const cartData = await clearCartService();
        setCart(cartData);
        return cartData;
    };



    const cartCount = useMemo(() => {
        return (cart.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    }, [cart]);

    const value = {

        cart,

        loading,

        cartCount,

        fetchCart,

        addItem,

        updateItem,

        removeItem,

        clearCart,

    };





return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
