import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import BlogForm from "../../components/blog/BlogForm";
import { getAdminBlogs, updateBlog } from "../../services/blog.service";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const blogs = await getAdminBlogs();
        const blog = blogs.find((item) => item._id === id);

        if (!blog) {
          toast.error("Blog not found");
          navigate("/blogs");
          return;
        }

        setFormData({
          title: blog.title || "",
          slug: blog.slug || "",
          excerpt: blog.excerpt || "",
          coverImage: blog.coverImage || "",
          author: blog.author || "WonderFox Editorial",
          category: blog.category || "",
          tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
          content: blog.content || "",
          status: blog.status || "draft",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load blog");
      } finally {
        setFetching(false);
      }
    };

    loadBlog();
  }, [id, navigate]);

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
      await updateBlog(id, {
        ...formData,
        status,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      toast.success(status === "published" ? "Blog published successfully" : "Blog updated as draft");
      navigate("/blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <p>Loading blog...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-card mx-auto max-w-4xl p-8">
        <h1 className="mb-8 text-3xl font-bold">Edit Blog</h1>

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

export default EditBlog;
