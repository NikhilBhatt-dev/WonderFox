import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import ProductForm from "../../components/products/ProductForm";

import {
    getProduct,
    updateProduct,
} from "../../services/product.service";

import { getCategories } from "../../services/category.service";

const EditProduct = () => {

    const { id } = useParams();

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
        brand: "",
        isFeatured: false,
        images: [],
    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value,
        }));

    };


    const handleImageUpload = (image) => {

        setFormData((prev) => ({
            ...prev,
            images: [image],
        }));

    };

    const fetchData = async () => {

        try {

            const [product, categoryList] = await Promise.all([
                getProduct(id),
                getCategories(),
            ]);

            setCategories(categoryList);

            

            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                discountPrice: product.discountPrice,
                category: product.category._id,
                stock: product.stock,
                brand: product.brand,
                isFeatured: product.isFeatured,
                images: product.images || [],
            });

        } catch (error) {

            toast.error("Failed to load product");

        }

    };

    useEffect(() => {

        fetchData();

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await updateProduct(id, formData);

            toast.success("Product updated successfully");

            navigate("/products");

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

            <div className="admin-card mx-auto max-w-3xl p-8">

                <h1 className="mb-8 text-3xl font-bold">
                    Edit Product
                </h1>

               


                <ProductForm
                    formData={formData}
                    categories={categories}
                    loading={loading}
                    submitText="Update Product"
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onImageUpload={handleImageUpload}
                />
            </div>

        </AdminLayout>

    );

};

export default EditProduct;
