
import { Outlet } from "react-router-dom";

import Navbar from "../component/layout/Navbar";
import Footer from "../component/layout/Footer";

const MainLayout = () => {
    return (
        <>
            <Navbar />

            <main className="min-w-0 overflow-x-clip">
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default MainLayout;
