import AdminLayout from "../../layouts/AdminLayout";

const Orders = () => {
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

                        <tr>

                            <td
                                colSpan={5}
                                className="py-10 text-center text-gray-500"
                            >
                                No Orders Yet
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </AdminLayout>
    );
};

export default Orders;