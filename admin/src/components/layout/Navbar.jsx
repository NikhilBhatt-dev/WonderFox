const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <header className="flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white px-6">
            <h2 className="text-xl font-semibold text-[#1F2937]">
                Admin Dashboard
            </h2>

            <p className="rounded-full bg-[#F7F7F5] px-3 py-1.5 text-sm font-medium text-[#26364A]">
                {user?.name}
            </p>
        </header>
    );
};

export default Navbar;
