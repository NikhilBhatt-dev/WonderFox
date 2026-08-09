import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    User,
    Package,
    Heart,
    Settings,
    LogOut,
    LogIn,
    UserPlus,
    ChevronDown,
} from "lucide-react";

const ProfileDropdown = () => {

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    const [open, setOpen] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {

            setUser(JSON.parse(storedUser));

        }

    }, []);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {

                setOpen(false);

            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

        window.location.reload();

    };

    return (

        <div
            ref={dropdownRef}
            className="relative hidden md:block"
        >

            <button
                onClick={() => setOpen(!open)}
                className="flex h-11 items-center gap-2 rounded-2xl bg-white px-3 text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:text-orange-500"
            >

                <User size={20} />

                <ChevronDown size={16} />

            </button>

            {open && (

                <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">

                    {user ? (

                                                <>

                            <div className="border-b border-gray-100 px-5 py-4">

                                <h3 className="text-lg font-semibold text-gray-800">

                                    {user.name}

                                </h3>

                                <p className="mt-1 text-sm text-gray-500">

                                    {user.email}

                                </p>

                            </div>

                            <div className="p-2">

                                <Link
                                    to="/profile"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-orange-50"
                                >

                                    <User size={18} />

                                    <span>My Profile</span>

                                </Link>

                                <Link
                                    to="/orders"
                                    onClick={() => setOpen(false)}
                                    className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-orange-50"
                                >

                                    <Package size={18} />

                                    <span>My Orders</span>

                                </Link>

                                <Link
                                    to="/wishlist"
                                    onClick={() => setOpen(false)}
                                    className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-orange-50"
                                >

                                    <Heart size={18} />

                                    <span>Wishlist</span>

                                </Link>

                                <button
                                    type="button"
                                    className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-gray-400"
                                >

                                    <Settings size={18} />

                                    <span>Settings (Coming Soon)</span>

                                </button>

                            </div>

                            <div className="border-t border-gray-100 p-2">

                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-red-500 transition hover:bg-red-50"
                                >

                                    <LogOut size={18} />

                                    <span>Logout</span>

                                </button>

                            </div>

                        </>

                    ) : (

                        <div className="p-2">

                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-orange-50"
                            >

                                <LogIn size={18} />

                                <span>Login</span>

                            </Link>

                            <Link
                                to="/register"
                                onClick={() => setOpen(false)}
                                className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-orange-50"
                            >

                                <UserPlus size={18} />

                                <span>Register</span>

                            </Link>

                        </div>

                    )}

                </div>

            )}

        </div>

    );

};

export default ProfileDropdown;