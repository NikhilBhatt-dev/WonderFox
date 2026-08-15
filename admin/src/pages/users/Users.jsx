import { useEffect, useState } from "react";
import { Eye, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { getUsers } from "../../services/user.service";

const formatDate = (date) => new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
}).format(new Date(date));

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setUsers(await getUsers());
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load users.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <AdminLayout>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Users</h1>
                    <p className="mt-1 text-gray-500">Registered account and customer-order information.</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-[#EAF0F5] px-4 py-2 font-semibold text-[#334E68]">
                    <UsersRound size={19} /> {users.length} users
                </div>
            </div>

            <div className="admin-table-wrap overflow-x-auto">
                <table className="min-w-[1000px] w-full">
                    <thead className="text-sm">
                        <tr>
                            <th className="px-6 py-4 text-left">User / Name</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">Phone</th>
                            <th className="px-6 py-4 text-center">Orders</th>
                            <th className="px-6 py-4 text-right">Total Spent</th>
                            <th className="px-6 py-4 text-left">Joined</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr><td colSpan={8} className="py-12 text-center text-gray-500">Loading users...</td></tr> : error ? (
                            <tr><td colSpan={8} className="py-12 text-center text-red-600">{error}</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={8} className="py-12 text-center text-gray-500">No registered users yet.</td></tr>
                        ) : users.map((user) => (
                            <tr key={user._id} className="border-t text-sm">
                                <td className="px-6 py-4"><p className="font-semibold text-gray-900">{user.name}</p><p className="mt-1 capitalize text-xs text-gray-500">{user.role}</p></td>
                                <td className="px-6 py-4 text-gray-700">{user.email}</td>
                                <td className="px-6 py-4 text-gray-700">{user.phone || "—"}</td>
                                <td className="px-6 py-4 text-center font-medium text-gray-900">{user.numberOfOrders}</td>
                                <td className="px-6 py-4 text-right font-semibold text-gray-900">₹{Number(user.totalSpent || 0).toLocaleString("en-IN")}</td>
                                <td className="px-6 py-4 text-gray-700">{formatDate(user.createdAt)}</td>
                                <td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${user.isActive ? "bg-[#EAF5EF] text-[#3F8F6B]" : "bg-[#FDECEC] text-[#D9534F]"}`}>{user.isActive ? "Active" : "Inactive"}</span></td>
                                <td className="px-6 py-4 text-center"><Link to={`/users/${user._id}`} className="inline-flex items-center gap-1.5 text-[#334E68] hover:text-[#263B50] hover:underline"><Eye size={16} /> View</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default Users;
