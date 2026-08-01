import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import { createCategory } from "../../services/category.service";

const AddCategory = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await createCategory(formData);

            toast.success("Category created");

            navigate("/categories");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AdminLayout>

            <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">

                <h1 className="mb-8 text-3xl font-bold">
                    Add Category
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        name="name"
                        placeholder="Category Name"
                        className="w-full rounded-lg border p-3"
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        rows="4"
                        className="w-full rounded-lg border p-3"
                        onChange={handleChange}
                    />

                    <button
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-6 py-3 text-white"
                    >
                        {loading ? "Saving..." : "Create Category"}
                    </button>

                </form>

            </div>

        </AdminLayout>

    );

};

export default AddCategory;