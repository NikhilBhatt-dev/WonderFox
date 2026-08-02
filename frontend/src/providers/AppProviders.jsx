import { CartProvider } from "../context/CartContext";

const AppProviders = ({ children }) => {

    return (

        <CartProvider>

            {children}

        </CartProvider>

    );

};

export default AppProviders;