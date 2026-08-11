import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import {
    getCategory,
    updateCategory,
} from "../../services/category.service";

const EditCategory = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: null,
    });

    useEffect(() => {

        const fetchCategory = async () => {

            try {

                const category = await getCategory(id);

                setFormData({
                    name: category.name,
                    description: category.description,
                });

            } catch (error) {

                toast.error("Failed to load category");

            }

        };

        fetchCategory();

    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await updateCategory(id, formData);

            toast.success("Category updated");

            navigate("/categories");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Update failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AdminLayout>

            <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">

                <h1 className="mb-8 text-3xl font-bold">
                    Edit Category
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                        required
                    />

                    <textarea
                        rows="4"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3"
                    />

                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Category Image
                        </label>

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="w-full rounded-lg border p-3"
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-6 py-3 text-white"
                    >
                        {loading ? "Updating..." : "Update Category"}
                    </button>

                </form>

            </div>

        </AdminLayout>

    );

};

export default EditCategory;