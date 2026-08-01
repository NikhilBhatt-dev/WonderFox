import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getProducts } from "../../services/product.service";
import { getCategories } from "../../services/category.service";

const Dashboard = () => {

    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        orders: 0,
        revenue: 0,
    });

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const [products, categories] = await Promise.all([
                    getProducts(),
                    getCategories(),
                ]);

                setStats({
                    products: products.length,
                    categories: categories.length,
                    orders: 0,
                    revenue: 0,
                });

            } catch (error) {

                console.error(error);

            }

        };

        fetchDashboard();

    }, []);

    return (
        <AdminLayout>

            <h1 className="mb-6 text-3xl font-bold">
                Dashboard
            </h1>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-xl bg-white p-6 shadow">

                    <h3 className="text-gray-500">
                        Products
                    </h3>

                    <p className="mt-2 text-3xl font-bold">
                        {stats.products}
                    </p>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <h3 className="text-gray-500">
                        Categories
                    </h3>

                    <p className="mt-2 text-3xl font-bold">
                        {stats.categories}
                    </p>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <h3 className="text-gray-500">
                        Orders
                    </h3>

                    <p className="mt-2 text-3xl font-bold">
                        {stats.orders}
                    </p>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <h3 className="text-gray-500">
                        Revenue
                    </h3>

                    <p className="mt-2 text-3xl font-bold">
                        ₹{stats.revenue}
                    </p>

                </div>

            </div>

        </AdminLayout>
    );
};

export default Dashboard;