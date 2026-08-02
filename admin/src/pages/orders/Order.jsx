import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import { getOrders } from "../../services/order.service";
const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const data = await getOrders();

                setOrders(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchOrders();

    }, []);
    return (
        <AdminLayout>

            <div className="flex items-center justify-between mb-6">

                <h1 className="text-3xl font-bold">
                    Orders
                </h1>

            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow">

                <table className="min-w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Order ID
                            </th>

                            <th className="px-6 py-4 text-left">
                                Customer
                            </th>

                            <th className="px-6 py-4 text-left">
                                Amount
                            </th>

                            <th className="px-6 py-4 text-left">
                                Status
                            </th>

                            <th className="px-6 py-4 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                   
                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="py-10 text-center"
                                >
                                    Loading...
                                </td>

                            </tr>

                        ) : orders.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="py-10 text-center text-gray-500"
                                >
                                    No Orders Yet
                                </td>

                            </tr>

                        ) : (

                            orders.map((order) => (

                                <tr
                                    key={order._id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4">
                                        {order.orderNumber}
                                    </td>

                                    <td className="px-6 py-4">
                                        {order.user?.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        ₹{order.totalPrice}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${order.orderStatus === "DELIVERED"
                                                ? "bg-green-100 text-green-700"
                                                : order.orderStatus === "CANCELLED"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {order.orderStatus}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <Link
                                            to={`/orders/${order._id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </Link>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </AdminLayout>
    );
};

export default Orders;