import { NavLink } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#1F2937] text-white">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">

                {/* Logo */}
                <div>
                    <h2 className="text-3xl font-bold text-orange-400">
                        WonderFox
                    </h2>

                    <p className="mt-4 text-gray-300">
                        Bringing happiness to every child with
                        premium quality toys.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="mb-5 text-xl font-semibold">
                        Quick Links
                    </h3>

                    <ul className="space-y-3">

                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>

                        <li>
                            <NavLink to="/collection">Collection</NavLink>
                        </li>

                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>

                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>

                    </ul>
                </div>

                {/* Customer */}
                <div>
                    <h3 className="mb-5 text-xl font-semibold">
                        Customer
                    </h3>

                    <ul className="space-y-3">
                        <li>FAQs</li>
                        <li>Shipping</li>
                        <li>Returns</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* Social */}
                <div>

                    <h3 className="mb-5 text-xl font-semibold">
                        Follow Us
                    </h3>

                    <div className="flex gap-4">

                        <button className="rounded-full bg-orange-500 p-3 transition hover:scale-110">
                            <FaFacebookF size={18} />
                            
                        </button>

                        <button className="rounded-full bg-orange-500 p-3 transition hover:scale-110">
                            <FaInstagram size={18} />
                        </button>

                        <button className="rounded-full bg-orange-500 p-3 transition hover:scale-110">
                            <FaXTwitter size={18} />
                        </button>

                        <button className="rounded-full bg-orange-500 p-3 transition hover:scale-110">
                            <FaYoutube size={18} />
                        </button>

                    </div>

                </div>

            </div>

            <div className="border-t border-gray-700 py-6 text-center text-gray-400">
                © 2026 WonderFox. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;