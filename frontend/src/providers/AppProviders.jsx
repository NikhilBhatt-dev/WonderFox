import { Toaster } from "react-hot-toast";

import { CartProvider } from "../context/CartContext";

const AppProviders = ({ children }) => {

    return (

        <CartProvider>

            {children}

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                }}
            />

        </CartProvider>

    );

};

export default AppProviders;