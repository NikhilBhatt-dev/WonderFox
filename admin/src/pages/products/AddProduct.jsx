import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import { createProduct } from "../../services/product.service";
import { getCategories } from "../../services/category.service";
import ProductForm from "../../components/products/ProductForm";

const AddProduct = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        category: "",
        stock: "",
        brand: "WonderFox",
        isFeatured: false,
    });


    const fetchCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load categories");

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await createProduct(formData);

            toast.success("Product created successfully");

            navigate("/products");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to create product"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCategories();

    }, []);

    return (
        <AdminLayout>

            <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

                <h1 className="mb-8 text-3xl font-bold">
                    Add Product
                </h1>

                <ProductForm
                    formData={formData}
                    categories={categories}
                    loading={loading}
                    submitText="Create Product"
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />

            </div>

        </AdminLayout>
    );
};

export default AddProduct;