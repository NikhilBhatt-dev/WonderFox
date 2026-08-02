import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";



import {
    getOrder,
    updateOrderStatus,
} from "../../services/order.service";

import toast from "react-hot-toast";
const OrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const data = await getOrder(id);

                setOrder(data);
                setStatus(data.orderStatus);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchOrder();

    }, [id]);




    const handleStatusUpdate = async () => {

        try {

            await updateOrderStatus(id, status);

            toast.success("Order status updated");

            const data = await getOrder(id);

            setOrder(data);

            setStatus(data.orderStatus);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update status"
            );

        }

    };


    if (loading) {
        return (
            <AdminLayout>
                <p>Loading...</p>
            </AdminLayout>
        );
    }

    if (!order) {
        return (
            <AdminLayout>
                <p>Order not found.</p>
            </AdminLayout>
        );
    }

    return (

        <AdminLayout>

            <h1 className="mb-6 text-3xl font-bold">
                Order Details
            </h1>

            {/* Customer Information */}

            <div className="rounded-xl bg-white p-6 shadow">

                <h2 className="mb-4 text-xl font-semibold">
                    Customer Information
                </h2>

                <div className="space-y-2">

                    <p>
                        <strong>Name:</strong> {order.user?.name}
                    </p>

                    <p>
                        <strong>Email:</strong> {order.user?.email}
                    </p>

                </div>

            </div>

            {/* Shipping Address */}

            <div className="mt-6 rounded-xl bg-white p-6 shadow">

                <h2 className="mb-4 text-xl font-semibold">
                    Shipping Address
                </h2>

                <div className="space-y-2">

                    <p>
                        <strong>Full Name:</strong> {order.shippingAddress.fullName}
                    </p>

                    <p>
                        <strong>Phone:</strong> {order.shippingAddress.phone}
                    </p>

                    <p>
                        <strong>Address:</strong> {order.shippingAddress.addressLine1}
                    </p>

                    {order.shippingAddress.addressLine2 && (

                        <p>
                            <strong>Address 2:</strong> {order.shippingAddress.addressLine2}
                        </p>

                    )}

                    {order.shippingAddress.landmark && (

                        <p>
                            <strong>Landmark:</strong> {order.shippingAddress.landmark}
                        </p>

                    )}

                    <p>
                        <strong>City:</strong> {order.shippingAddress.city}
                    </p>

                    <p>
                        <strong>State:</strong> {order.shippingAddress.state}
                    </p>

                    <p>
                        <strong>Postal Code:</strong> {order.shippingAddress.postalCode}
                    </p>

                    <p>
                        <strong>Country:</strong> {order.shippingAddress.country}
                    </p>

                </div>

            </div>

            {/* Ordered Products */}

            <div className="mt-6 rounded-xl bg-white p-6 shadow">

                <h2 className="mb-4 text-xl font-semibold">
                    Ordered Products
                </h2>

                <div className="space-y-4">

                    {order.items.map((item) => (

                        <div
                            key={item.product}
                            className="flex items-center justify-between border-b pb-4"
                        >

                            <div className="flex items-center gap-4">

                                {item.image ? (

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-16 w-16 rounded-lg object-cover"
                                    />

                                ) : (

                                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-500">
                                        No Image
                                    </div>

                                )}

                                <div>

                                    <h3 className="font-semibold">
                                        {item.name}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Quantity : {item.quantity}
                                    </p>

                                </div>

                            </div>

                            <div className="text-right">

                                <p className="font-semibold">
                                    ₹{item.price}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            {/* Payment & Summary */}

            <div className="mt-6 rounded-xl bg-white p-6 shadow">

                <h2 className="mb-4 text-xl font-semibold">
                    Payment Details
                </h2>

                <div className="space-y-3">

                    <p>

                        <strong>Payment Method:</strong>{" "}

                        {order.paymentMethod}

                    </p>

                    <p>

                        <strong>Payment Status:</strong>{" "}

                        {order.paymentStatus}

                    </p>

                    <p>

                        <strong>Order Status:</strong>{" "}

                        {order.orderStatus}

                    </p>

                    <hr />

                    <p>

                        <strong>Items Price:</strong>

                        ₹{order.itemsPrice}

                    </p>

                    <p>

                        <strong>Shipping:</strong>

                        ₹{order.shippingPrice}

                    </p>

                    <p>

                        <strong>Tax:</strong>

                        ₹{order.taxPrice}

                    </p>

                    <h3 className="text-xl font-bold">

                        Total : ₹{order.totalPrice}

                    </h3>

                    <hr className="my-4" />

                    <div className="space-y-4">

                        <label className="block font-medium">
                            Update Order Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full rounded-lg border p-3"
                        >

                            <option value="PENDING">
                                PENDING
                            </option>

                            <option value="CONFIRMED">
                                CONFIRMED
                            </option>

                            <option value="PACKED">
                                PACKED
                            </option>

                            <option value="SHIPPED">
                                SHIPPED
                            </option>

                            <option value="DELIVERED">
                                DELIVERED
                            </option>

                            <option value="CANCELLED">
                                CANCELLED
                            </option>

                        </select>

                        <button
                            onClick={handleStatusUpdate}
                            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                        >
                            Update Status
                        </button>

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

};

export default OrderDetails;