import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import ProfileDropdown from "../common/ProfileDropdown";

import {
  Menu,
  ShoppingBag,
  X,
  Search,
  Heart,
  User,
} from "lucide-react";

import useCart from "../../hooks/useCart";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Collection", path: "/collection" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const iconButton =
  "hidden md:flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:text-orange-500";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const { cartCount } = useCart();

  return (

    <header className="sticky top-0 z-50 px-4 pt-4">

      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[22px] border border-white/80 bg-white/75 px-6 py-4 shadow-lg backdrop-blur-xl">

        {/* Logo */}

        <NavLink
          to="/"
          className="flex items-center gap-3"
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-xl text-white">
            🦊
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-800">
            WonderFox
          </h2>

        </NavLink>

        {/* Desktop Navigation */}

        <ul className="hidden items-center gap-8 md:flex">

          {navLinks.map((link) => (

            <li key={link.path}>

              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition-all duration-300 ${isActive
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                  }`
                }
              >

                {link.name}

              </NavLink>

            </li>

          ))}

        </ul>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          {/* Search */}

          <button className={iconButton}>

            <Search size={20} />

          </button>

          {/* Wishlist */}

          <Link
            to="/wishlist"
            className={iconButton}
          >

            <Heart size={20} />

          </Link>

          {/* User */}

          <ProfileDropdown />
          {/* Cart */}

          <Link
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-200"
          >

            <ShoppingBag size={20} />

            {cartCount > 0 && (

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">

                {cartCount}

              </span>

            )}

          </Link>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white transition-all duration-300 hover:bg-gray-100 md:hidden"
          >

            {isOpen
              ? <X size={22} />
              : <Menu size={22} />
            }

          </button>

        </div>

      </nav>

      {/* Mobile Menu */}

      {isOpen && (

        <div className="mx-auto mt-3 max-w-7xl rounded-[22px] border border-white/80 bg-white/75 p-5 shadow-lg backdrop-blur-xl md:hidden">

          <ul className="flex flex-col gap-4">

            {navLinks.map((link) => (

              <li key={link.path}>

                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-3 py-2 font-medium transition-all duration-300 ${isActive
                      ? "bg-orange-100 text-orange-500"
                      : "text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                    }`
                  }
                >

                  {link.name}

                </NavLink>

              </li>

            ))}

          </ul>

        </div>

      )}

    </header>

  );

};

export default Navbar;