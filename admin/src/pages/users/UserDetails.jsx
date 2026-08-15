import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, UserRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { getUser } from "../../services/user.service";

const formatDate = (date) => new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date));

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setUser(await getUser(id));
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load user details.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    if (loading) return <AdminLayout><p className="text-gray-500">Loading user details...</p></AdminLayout>;
    if (error || !user) return <AdminLayout><p className="text-red-600">{error || "User not found."}</p></AdminLayout>;

    const address = user.address;
    return (
        <AdminLayout>
            <Link to="/users" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"><ArrowLeft size={17} /> Back to users</Link>
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4"><div className="rounded-full bg-blue-100 p-4 text-blue-700"><UserRound size={30} /></div><div><h1 className="text-3xl font-bold text-gray-900">{user.name}</h1><p className="mt-1 text-gray-500">{user.email}</p></div></div>
                <span className={`rounded-full px-3 py-1.5 text-sm font-semibold ${user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{user.isActive ? "Active" : "Inactive"}</span>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <section className="rounded-xl bg-white p-6 shadow lg:col-span-2"><h2 className="mb-5 text-xl font-bold">Account Information</h2><dl className="grid gap-5 sm:grid-cols-2"><div><dt className="text-sm text-gray-500">Full name</dt><dd className="mt-1 font-medium">{user.name}</dd></div><div><dt className="text-sm text-gray-500">Email</dt><dd className="mt-1 font-medium">{user.email}</dd></div><div><dt className="text-sm text-gray-500">Phone</dt><dd className="mt-1 font-medium">{user.phone || "Not provided"}</dd></div><div><dt className="text-sm text-gray-500">Joined</dt><dd className="mt-1 font-medium">{formatDate(user.createdAt)}</dd></div><div><dt className="text-sm text-gray-500">Account role</dt><dd className="mt-1 capitalize font-medium">{user.role}</dd></div><div><dt className="text-sm text-gray-500">Account status</dt><dd className="mt-1 font-medium">{user.isActive ? "Active" : "Inactive"}</dd></div></dl></section>
                <section className="rounded-xl bg-white p-6 shadow"><h2 className="mb-5 text-xl font-bold">Order Summary</h2><p className="text-3xl font-bold text-gray-900">{user.numberOfOrders}</p><p className="text-sm text-gray-500">Total orders</p><div className="my-5 border-t" /><p className="text-3xl font-bold text-gray-900">₹{Number(user.totalSpent || 0).toLocaleString("en-IN")}</p><p className="text-sm text-gray-500">Total spent (excludes cancelled orders)</p></section>
            </div>

            <section className="mt-6 rounded-xl bg-white p-6 shadow"><h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><MapPin size={20} className="text-blue-600" /> Latest shipping address</h2>{address ? <p className="leading-7 text-gray-700">{address.fullName}, {address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ""}{address.landmark ? `, ${address.landmark}` : ""}, {address.city}, {address.state} - {address.postalCode}, {address.country}</p> : <p className="text-gray-500">No shipping address available yet.</p>}</section>

            <section className="mt-6 overflow-x-auto rounded-xl bg-white shadow"><div className="border-b p-6"><h2 className="text-xl font-bold">Recent Orders</h2></div><table className="min-w-[850px] w-full"><thead className="bg-gray-50 text-left text-sm text-gray-600"><tr><th className="px-6 py-4">Order</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Payment</th><th className="px-6 py-4">Status history</th><th className="px-6 py-4 text-right">Amount</th></tr></thead><tbody>{user.recentOrders.length === 0 ? <tr><td colSpan={5} className="p-8 text-center text-gray-500">No orders yet.</td></tr> : user.recentOrders.map((order) => <tr key={order._id} className="border-t"><td className="px-6 py-4 font-medium">{order.orderNumber}</td><td className="px-6 py-4">{formatDate(order.createdAt)}</td><td className="px-6 py-4">{order.paymentStatus}</td><td className="px-6 py-4"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{order.orderStatus}</span>{order.statusHistory?.length > 0 && <p className="mt-2 text-xs text-gray-500">{order.statusHistory.map((entry) => entry.status).join(" → ")}</p>}</td><td className="px-6 py-4 text-right font-semibold">₹{Number(order.totalPrice).toLocaleString("en-IN")}</td></tr>)}</tbody></table></section>
        </AdminLayout>
    );
};

export default UserDetails;
