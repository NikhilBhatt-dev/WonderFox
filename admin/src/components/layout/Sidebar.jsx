import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingCart,
    UsersRound,
    NotebookPen,
    Mail,
    LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    const menus = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
        },
        {
            name: "Products",
            icon: Package,
            path: "/products",
        },
        {
            name: "Categories",
            icon: Tags,
            path: "/categories",
        },
        {
            name: "Blogs",
            icon: NotebookPen,
            path: "/blogs",
        },
        {
            name: "Newsletter",
            icon: Mail,
            path: "/newsletter",
        },
        {
            name: "Orders",
            icon: ShoppingCart,
            path: "/orders",
        },
        {
            name: "Users",
            icon: UsersRound,
            path: "/users",
        },
    ];

    return (

       <aside className="flex h-[calc(100vh+228px)] w-64 shrink-0 flex-col overflow-y-auto border-r border-[#34495E] bg-[#26364A] text-slate-100">
            <div className="border-b border-[#34495E] p-6">

                <h1 className="text-2xl font-bold text-white">
                    WonderFox
                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[#FF6B00]" />
                </h1>

            </div>

            <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">

                {menus.map(({ name, icon: Icon, path }) => (

                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${isActive
                                ? "border-l-2 border-[#FF6B00] bg-[#3B5068] text-white"
                                : "border-l-2 border-transparent text-slate-200 hover:bg-[#34495E] hover:text-white"
                            }`
                        }
                    >
                        <Icon size={20} />
                        <span>{name}</span>
                    </NavLink>

                ))}

                <button
                    onClick={handleLogout}
                    className="mt-auto flex items-center gap-3 rounded-lg px-4 py-3 text-slate-200 transition hover:bg-[#34495E] hover:text-white"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>

            </nav>

        </aside>
    );
};

export default Sidebar;
