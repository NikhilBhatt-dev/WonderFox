// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import AdminLayout from "../../layouts/AdminLayout";
// import { createCategory } from "../../services/category.service";

// const AddCategory = () => {

//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(false);

//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//     });

//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });

//     };

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             setLoading(true);

//             await createCategory(formData);

//             toast.success("Category created");

//             navigate("/categories");

//         } catch (error) {

//             toast.error(
//                 error.response?.data?.message ||
//                 "Failed"
//             );

//         } finally {

//             setLoading(false);

//         }

//     };

//     return (

//         <AdminLayout>

//             <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">

//                 <h1 className="mb-8 text-3xl font-bold">
//                     Add Category
//                 </h1>

//                 <form
//                     onSubmit={handleSubmit}
//                     className="space-y-5"
//                 >

//                     <input
//                         name="name"
//                         placeholder="Category Name"
//                         className="w-full rounded-lg border p-3"
//                         onChange={handleChange}
//                         required
//                     />

//                     <textarea
//                         name="description"
//                         placeholder="Description"
//                         rows="4"
//                         className="w-full rounded-lg border p-3"
//                         onChange={handleChange}
//                     />

//                     <button
//                         disabled={loading}
//                         className="rounded-lg bg-blue-600 px-6 py-3 text-white"
//                     >
//                         {loading ? "Saving..." : "Create Category"}
//                     </button>

//                 </form>

//             </div>

//         </AdminLayout>

//     );

// };

// export default AddCategory;


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
        image: null,
    });

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

            await createCategory(formData);

            toast.success("Category created");

            navigate("/categories");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to create category"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AdminLayout>

            <div className="admin-card mx-auto max-w-2xl p-8">

                <h1 className="mb-8 text-3xl font-bold">
                    Add Category
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Category Name */}

                    <input
                        name="name"
                        placeholder="Category Name"
                        className="w-full rounded-lg border p-3"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />


                    {/* Description */}

                    <textarea
                        name="description"
                        placeholder="Description"
                        rows="4"
                        className="w-full rounded-lg border p-3"
                        value={formData.description}
                        onChange={handleChange}
                    />


                    {/* Category Image */}

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
                            required
                        />

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="admin-primary-button px-6 py-3 disabled:opacity-60"
                    >

                        {loading
                            ? "Uploading..."
                            : "Create Category"
                        }

                    </button>

                </form>

            </div>

        </AdminLayout>

    );
};

export default AddCategory;
