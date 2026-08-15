import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import {
    getProducts,
    deleteProduct,
} from "../../services/product.service";

import { Link } from "react-router-dom";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {

        try {

            const data = await getProducts();

            setProducts(data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to fetch products");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProducts();

    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            await deleteProduct(id);

            toast.success("Product deleted successfully");

            fetchProducts();

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Delete failed"
            );

        }

    };

    return (
        <AdminLayout>

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Products
                </h1>

                <Link
                    to="/products/add"
                    className="admin-primary-button px-5 py-2"
                >
                    + Add Product
                </Link>

            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="admin-table-wrap">

                    <table className="min-w-full">

                        <thead>

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    Image
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Product
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Category
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Price
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Stock
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Featured
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {products.map((product) => (

                                <tr
                                    key={product._id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4">

                                        {product.images.length > 0 ? (
                                            <img
                                                src={product.images[0].url}
                                                alt={product.name}
                                                className="h-14 w-14 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                                                No Image
                                            </div>
                                        )}

                                    </td>

                                    <td className="px-6 py-4 font-medium">
                                        {product.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {product.category?.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        ₹{product.discountPrice || product.price}
                                    </td>

                                    <td className="px-6 py-4">
                                        {product.stock}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs ${product.isFeatured
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            {product.isFeatured ? "Yes" : "No"}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <Link
                                            to={`/products/edit/${product._id}`}
                                            className="mr-4 text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>

                                        
                                        <button
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            )}

        </AdminLayout>
    );
};

export default Products;
