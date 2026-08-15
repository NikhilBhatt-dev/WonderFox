import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import { createBlog } from "../../services/blog.service";
import BlogForm from "../../components/blog/BlogForm";

const AddBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    coverImage: "",
    author: "WonderFox Editorial",
    category: "",
    tags: "",
    content: "",
    status: "draft",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({ ...prev, coverImage: url }));
  };

  const submitBlog = async (status) => {
    if (!formData.title || !formData.excerpt || !formData.content || !formData.category || !formData.coverImage) {
      toast.error("Please fill in all required fields and upload a cover image.");
      return;
    }

    try {
      setLoading(true);
      await createBlog({
        ...formData,
        status,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        slug: formData.slug || formData.title,
      });

      toast.success(status === "published" ? "Blog published successfully" : "Blog saved as draft");
      navigate("/blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-card mx-auto max-w-4xl p-8">
        <h1 className="mb-8 text-3xl font-bold">Create Blog</h1>

        <BlogForm
          formData={formData}
          loading={loading}
          onChange={handleChange}
          onSaveDraft={() => submitBlog("draft")}
          onPublish={() => submitBlog("published")}
          onImageUpload={handleImageUpload}
        />
      </div>
    </AdminLayout>
  );
};

export default AddBlog;
