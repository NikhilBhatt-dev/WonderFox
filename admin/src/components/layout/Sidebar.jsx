import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingCart,
    LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
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
    ];

    return (
        <aside className="h-screen w-64 border-r bg-white">
            <div className="border-b p-6">
                <h1 className="text-2xl font-bold text-blue-600">
                    WonderFox
                </h1>
            </div>

            <nav className="flex flex-col p-4">

                {menus.map(({ name, icon: Icon, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 ${isActive
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100"
                            }`
                        }
                    >
                        <Icon size={20} />
                        {name}
                    </NavLink>
                ))}

                <button className="mt-auto flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-red-50 hover:text-red-600">
                    <LogOut size={20} />
                    Logout
                </button>

            </nav>
        </aside>
    );
};

export default Sidebar;