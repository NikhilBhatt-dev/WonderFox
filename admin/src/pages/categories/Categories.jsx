import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
    getCategories,
    deleteCategory,
} from "../../services/category.service";



import { Link } from "react-router-dom";

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to fetch categories");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCategories();

    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this category?"
        );

        if (!confirmDelete) return;

        try {

            await deleteCategory(id);

            toast.success("Category deleted");

            fetchCategories();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete failed"
            );

        }

    };

    return (
        <AdminLayout>

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Categories
                </h1>

                <Link
                    to="/categories/add"
                    className="admin-primary-button px-5 py-2"
                >
                    + Add Category
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
                                    Name
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Description
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {categories.map((category) => (

                                <tr
                                    key={category._id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4 font-medium">
                                        {category.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {category.description}
                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <Link
                                            to={`/categories/edit/${category._id}`}
                                            className="mr-4 text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(category._id)
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

export default Categories;
