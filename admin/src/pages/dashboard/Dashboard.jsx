import AdminLayout from "../../layouts/AdminLayout";

const Dashboard = () => {
    return (
        <AdminLayout>

            <h1 className="mb-6 text-3xl font-bold">
                Dashboard
            </h1>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-xl bg-white p-6 shadow">
                    <h3 className="text-gray-500">Products</h3>
                    <p className="mt-2 text-3xl font-bold">0</p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h3 className="text-gray-500">Categories</h3>
                    <p className="mt-2 text-3xl font-bold">0</p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h3 className="text-gray-500">Orders</h3>
                    <p className="mt-2 text-3xl font-bold">0</p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h3 className="text-gray-500">Revenue</h3>
                    <p className="mt-2 text-3xl font-bold">₹0</p>
                </div>

            </div>

        </AdminLayout>
    );
};

export default Dashboard;