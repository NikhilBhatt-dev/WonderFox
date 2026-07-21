
import { Outlet } from "react-router-dom";

import Navbar from "../component/layout/Navbar";
import Footer from "../component/layout/Footer";

const MainLayout = () => {
    return (
        <>
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default MainLayout;