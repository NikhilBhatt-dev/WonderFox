// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import ProfileDropdown from "../common/ProfileDropdown";

// import {
//   Menu,
//   ShoppingBag,
//   X,
//   Search,
//   Heart,
// } from "lucide-react";

// import useCart from "../../hooks/useCart";

// const navLinks = [
//   { name: "Home", path: "/" },
//   { name: "Collection", path: "/collection" },
//   { name: "Blog", path: "/blog" },
//   { name: "About", path: "/about" },
//   { name: "Contact", path: "/contact" },
// ];

// const iconButton =
//   "relative hidden lg:flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-gray-700 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:bg-[#fff4ee] hover:text-orange-500";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [wishlistCount, setWishlistCount] = useState(0);

//   const { cartCount } = useCart();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const syncWishlistCount = () => {
//       try {
//         const savedWishlist = JSON.parse(
//           localStorage.getItem("wishlist") || "[]"
//         );

//         setWishlistCount(
//           Array.isArray(savedWishlist) ? savedWishlist.length : 0
//         );
//       } catch {
//         setWishlistCount(0);
//       }
//     };

//     syncWishlistCount();

//     window.addEventListener("wishlist:updated", syncWishlistCount);

//     return () => {
//       window.removeEventListener("wishlist:updated", syncWishlistCount);
//     };
//   }, []);

//   const handleSearchSubmit = (event) => {
//     event.preventDefault();

//     const trimmed = searchText.trim();

//     navigate(
//       trimmed
//         ? `/collection?search=${encodeURIComponent(trimmed)}`
//         : "/collection"
//     );

//     setSearchText("");
//     setSearchOpen(false);
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full max-w-full px-1 pt-1">
//   {/* Top Delivery Bar */}
//   <div className="w-full overflow-hidden bg-[#1a212d]">
//     <div className="flex items-center justify-center gap-2 px-4 py-2 text-center text-[11px] font-medium text-white sm:text-sm">
//       <span className="text-orange-300">Free delivery</span>
//       <span>on orders over ₹150</span>

//       <span className="hidden text-slate-300 sm:inline">
//         • Need help? Visit our Contact page
//       </span>
//     </div>
//   </div>

//   {/* Navbar Area */}
//   <div className="w-full bg-transparent px-2 py-2 sm:px-5 sm:py-3">
//     <nav className="flex w-full min-w-0 items-center justify-between gap-3 rounded-[24px] border border-white/70 bg-white px-3 py-3 shadow-[0_8px_25px_rgba(15,23,42,0.08)] sm:px-5">

//       {/* Logo */}
//       <NavLink to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-xl shadow-md shadow-orange-200 sm:h-11 sm:w-11">
//           🦊
//         </div>

//         <h2 className="truncate text-xl font-black tracking-[-0.06em] text-gray-800 sm:text-[1.7rem]">
//           WonderFox
//         </h2>
//       </NavLink>

//       {/* Desktop Navigation */}
      
//         <ul className="hidden items-center gap-4 lg:flex">
//         {navLinks.map((link) => (
//           <li key={link.path}>
//             <NavLink
//               to={link.path}
//               className={({ isActive }) =>
//                 `text-[0.98rem] font-medium transition-all duration-300 ${
//                   isActive
//                     ? "text-orange-500"
//                     : "text-gray-700 hover:text-orange-500"
//                 }`
//               }
//             >
//               {link.name}
//             </NavLink>
//           </li>
//         ))}
//       </ul>

//       {/* Right Side */}
//       <div className="flex shrink-0 items-center gap-2 sm:gap-3">

//         {/* Search */}
//         <form
//           onSubmit={handleSearchSubmit}
//           className={`hidden items-center gap-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 lg:flex ${
//             searchOpen
//               ? "w-64 opacity-100"
//               : "w-0 border-transparent opacity-0"
//           }`}
//         >
//           <Search size={16} className="ml-3 text-gray-400" />

//           <input
//             type="text"
//             value={searchText}
//             onChange={(event) => setSearchText(event.target.value)}
//             placeholder="Search products"
//             className="w-full border-0 bg-transparent py-2.5 pr-3 text-sm text-gray-700 outline-none placeholder:text-gray-400"
//           />
//         </form>

//         <button
//           type="button"
//           aria-label="Search products"
//           onClick={() => setSearchOpen((prev) => !prev)}
//           className={iconButton}
//         >
//           <Search size={20} />
//         </button>

//         {/* Wishlist */}
//         <Link
//           to="/wishlist"
//           aria-label="Wishlist"
//           className={iconButton}
//         >
//           <Heart size={20} />

//           {wishlistCount > 0 && (
//             <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
//               {wishlistCount}
//             </span>
//           )}
//         </Link>

//         {/* Profile */}
//         <ProfileDropdown />

//         {/* Cart */}
//         <Link
//           to="/cart"
//           aria-label="Cart"
//           className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-orange-200 sm:h-11 sm:w-11"
//         >
//           <ShoppingBag size={20} />

//           {cartCount > 0 && (
//             <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
//               {cartCount}
//             </span>
//           )}
//         </Link>

//         {/* Mobile Menu */}
//         <button
//           type="button"
//           aria-label="Open menu"
//           onClick={() => setIsOpen(!isOpen)}
//           className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-gray-700 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:bg-gray-100 xl:hidden sm:h-11 sm:w-11"
//         >
//           {isOpen ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </div>
//     </nav>

//     {/* Mobile Menu */}
//     {isOpen && (
//       <div className="mx-auto mt-3 max-w-full rounded-[22px] border border-white/80 bg-white/95 p-4 shadow-lg backdrop-blur-xl xl:hidden sm:p-5">
//         <form onSubmit={handleSearchSubmit} className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 lg:hidden">
//           <Search size={18} className="shrink-0 text-gray-400" />
//           <input type="search" value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search products" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
//         </form>
//         <ul className="flex flex-col gap-3">
//           {navLinks.map((link) => (
//             <li key={link.path}>
//               <NavLink
//                 to={link.path}
//                 onClick={() => setIsOpen(false)}
//                 className={({ isActive }) =>
//                   `block rounded-xl px-3 py-2.5 text-base font-medium transition-all duration-300 ${
//                     isActive
//                       ? "bg-orange-100 text-orange-500"
//                       : "text-gray-700 hover:bg-gray-100 hover:text-orange-500"
//                   }`
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </div>
//     )}
//   </div>
// </header>
//   );
// };

// export default Navbar;


import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileDropdown from "../common/ProfileDropdown";

import {
  Menu,
  ShoppingBag,
  X,
  Search,
  Heart,
} from "lucide-react";

import useCart from "../../hooks/useCart";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Collection", path: "/collection" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const iconButton =
  "relative hidden lg:flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-gray-700 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:bg-[#fff4ee] hover:text-orange-500";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);

  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const syncWishlistCount = () => {
      try {
        const savedWishlist = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );

        setWishlistCount(
          Array.isArray(savedWishlist) ? savedWishlist.length : 0
        );
      } catch {
        setWishlistCount(0);
      }
    };

    syncWishlistCount();

    window.addEventListener("wishlist:updated", syncWishlistCount);

    return () => {
      window.removeEventListener("wishlist:updated", syncWishlistCount);
    };
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmed = searchText.trim();

    navigate(
      trimmed
        ? `/collection?search=${encodeURIComponent(trimmed)}`
        : "/collection"
    );

    setSearchText("");
    setSearchOpen(false);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full max-w-full px-1 pt-1">

      {/* Top Delivery Bar */}
      <div className="w-full overflow-hidden bg-[#1a212d]">
        <div className="flex items-center justify-center gap-2 px-4 py-2 text-center text-[11px] font-medium text-white sm:text-sm">
          <span className="text-orange-300">
            Free delivery
          </span>

          <span>
            on orders over ₹150
          </span>

          <span className="hidden text-slate-300 sm:inline">
            • Need help? Visit our Contact page
          </span>
        </div>
      </div>

      {/* Navbar Area */}
      <div className="w-full bg-transparent px-2 py-2 sm:px-5 sm:py-3">

        <nav className="flex w-full min-w-0 items-center justify-between gap-3 rounded-[24px] border border-white/70 bg-white px-3 py-3 shadow-[0_8px_25px_rgba(15,23,42,0.08)] sm:px-5">

          {/* Logo */}
          <NavLink
            to="/"
            className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-xl shadow-md shadow-orange-200 sm:h-11 sm:w-11">
              🦊
            </div>

            <h2 className="truncate text-xl font-black tracking-[-0.06em] text-gray-800 sm:text-[1.7rem]">
              WonderFox
            </h2>
          </NavLink>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-4 lg:flex">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `whitespace-nowrap text-[0.95rem] font-medium transition-all duration-300 ${
                      isActive
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
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            {/* Desktop Search Input */}
            <form
              onSubmit={handleSearchSubmit}
              className={`hidden items-center gap-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 lg:flex ${
                searchOpen
                  ? "w-64 opacity-100"
                  : "w-0 border-transparent opacity-0"
              }`}
            >
              <Search
                size={16}
                className="ml-3 shrink-0 text-gray-400"
              />

              <input
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search products"
                className="w-full border-0 bg-transparent py-2.5 pr-3 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
            </form>

            {/* Search Button */}
            <button
              type="button"
              aria-label="Search products"
              onClick={() => setSearchOpen((prev) => !prev)}
              className={iconButton}
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className={iconButton}
            >
              <Heart size={20} />

              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <div className="hidden lg:block">
              <ProfileDropdown />
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-orange-200 sm:h-11 sm:w-11"
            >
              <ShoppingBag size={20} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile / Tablet Menu */}
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-gray-700 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:bg-gray-100 lg:hidden sm:h-11 sm:w-11"
            >
              {isOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>

          </div>
        </nav>

        {/* Mobile / Tablet Menu */}
        {isOpen && (
          <div className="mx-auto mt-3 max-w-full rounded-[22px] border border-white/80 bg-white/95 p-4 shadow-lg backdrop-blur-xl lg:hidden sm:p-5">

            {/* Mobile Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2"
            >
              <Search
                size={18}
                className="shrink-0 text-gray-400"
              />

              <input
                type="search"
                value={searchText}
                onChange={(event) =>
                  setSearchText(event.target.value)
                }
                placeholder="Search products"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </form>

            {/* Mobile Links */}
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-3 py-2.5 text-base font-medium transition-all duration-300 ${
                        isActive
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

      </div>
    </header>
  );
};

export default Navbar;