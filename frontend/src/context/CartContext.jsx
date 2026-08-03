



import {
    getCart,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart as clearCartService,
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

            const cart = await getCart();

            setCart(
                cart || {
                    items: [],
                    totalAmount: 0,
                }
            );

        } catch (error) {

            console.error(error);

            setCart({
                items: [],
                totalAmount: 0,
            });

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

        return response;

    };

    const updateItem = async (productId, quantity) => {

        const cart = await updateCart(
            productId,
            quantity
        );

        setCart(cart);

        return cart;

    };

    const removeItem = async (productId) => {

        const cart = await removeFromCart(
            productId
        );

        setCart(cart);

        return cart;

    };


    const clearCart = async () => {

        const cart = await clearCartService();

        setCart(cart);

    };



    const cartCount = useMemo(() => {

        return (cart.items || []).reduce(
            (sum, item) => sum + item.quantity,
            0
        );

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
