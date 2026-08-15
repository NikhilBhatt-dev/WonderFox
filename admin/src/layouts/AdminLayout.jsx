import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const AdminLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-[#F7F7F5] text-[#1F2937]">

            <Sidebar />

            <div className="flex flex-1 flex-col">

                <Navbar />

                <main className="flex-1 p-6">
                    {children}
                </main>

            </div>

        </div>
    );
};

export default AdminLayout;
