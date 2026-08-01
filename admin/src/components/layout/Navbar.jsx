const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <h2 className="text-xl font-semibold">
                Admin Dashboard
            </h2>

            <p className="font-medium">
                {user?.name}
            </p>
        </header>
    );
};

export default Navbar;