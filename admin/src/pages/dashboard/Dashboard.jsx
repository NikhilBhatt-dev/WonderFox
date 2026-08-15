import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import StatCard from "../../components/dashboard/StatCard";

import { getDashboardStats } from "../../services/dashboard.service";

const Dashboard = () => {

    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalOrders: 0,
        totalRevenue: 0,
        recentProducts: [],
        lowStockProducts: [],
    });

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const data = await getDashboardStats();

                setStats(data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchDashboard();

    }, []);

    return (

        <AdminLayout>

            <h1 className="mb-6 text-3xl font-bold text-[#1F2937]">
                Dashboard
            </h1>

            {/* Stats */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Products"
                    value={stats.totalProducts}
                />

                <StatCard
                    title="Categories"
                    value={stats.totalCategories}
                />

                <StatCard
                    title="Orders"
                    value={stats.totalOrders}
                />

                <StatCard
                    title="Revenue"
                    value={stats.totalRevenue}
                    prefix="₹"
                />

            </div>

            {/* Dashboard Widgets */}

            <div className="mt-8 grid gap-6 lg:grid-cols-2">

                {/* Recent Products */}

                <div className="admin-card p-6">

                    <h2 className="mb-4 text-xl font-bold text-[#1F2937]">
                        Recent Products
                    </h2>

                    {stats.recentProducts.length === 0 ? (

                        <p className="text-[#6B7280]">
                            No products found.
                        </p>

                    ) : (

                        <div className="space-y-4">

                            {stats.recentProducts.map((product) => (

                                <div
                                    key={product._id}
                                    className="flex items-center justify-between rounded-lg border p-3"
                                >

                                    <div className="flex items-center gap-4">

                                        {product.images?.length > 0 ? (

                                            <img
                                                src={product.images[0].url}
                                                alt={product.name}
                                                className="h-14 w-14 rounded-lg object-cover"
                                            />

                                        ) : (

                                            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#F7F7F5] text-xs text-[#6B7280]">
                                                No Image
                                            </div>

                                        )}

                                        <div>

                                            <h3 className="font-semibold">
                                                {product.name}
                                            </h3>

                                            <p className="text-sm text-[#6B7280]">
                                                Stock : {product.stock}
                                            </p>

                                        </div>

                                    </div>

                                    <p className="font-bold text-[#334E68]">
                                        ₹{product.price}
                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

                {/* Low Stock Products */}

                <div className="admin-card p-6">

                    <h2 className="mb-4 text-xl font-bold text-[#D9534F]">
                        ⚠ Low Stock Products
                    </h2>

                    {stats.lowStockProducts.length === 0 ? (

                        <p className="text-[#6B7280]">
                            No low stock products.
                        </p>

                    ) : (

                        <div className="space-y-4">

                            {stats.lowStockProducts.map((product) => (

                                <div
                                    key={product._id}
                                    className="flex items-center justify-between rounded-lg border p-3"
                                >

                                    <div className="flex items-center gap-4">

                                        {product.images?.length > 0 ? (

                                            <img
                                                src={product.images[0].url}
                                                alt={product.name}
                                                className="h-14 w-14 rounded-lg object-cover"
                                            />

                                        ) : (

                                            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#F7F7F5] text-xs text-[#6B7280]">
                                                No Image
                                            </div>

                                        )}

                                        <div>

                                            <h3 className="font-semibold">
                                                {product.name}
                                            </h3>

                                            <p className="text-sm text-[#D9534F]">
                                                Only {product.stock} left
                                            </p>

                                        </div>

                                    </div>

                                    <span className="rounded-full bg-[#FDECEC] px-3 py-1 text-sm font-semibold text-[#D9534F]">
                                        Low Stock
                                    </span>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </AdminLayout>

    );

};

export default Dashboard;
