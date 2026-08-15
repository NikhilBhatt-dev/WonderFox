import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingCart,
    UsersRound,
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
        <aside className="flex h-screen w-64 flex-col border-r bg-white">

            <div className="border-b p-6">

                <h1 className="text-2xl font-bold text-blue-600">
                    WonderFox
                </h1>

            </div>

            <nav className="flex flex-1 flex-col p-4">

                {menus.map(({ name, icon: Icon, path }) => (

                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        <Icon size={20} />
                        <span>{name}</span>
                    </NavLink>

                ))}

                <button
                    onClick={handleLogout}
                    className="mt-auto flex items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition hover:bg-red-50"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>

            </nav>

        </aside>
    );
};

export default Sidebar;
