import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import { getAdminBlogs, deleteBlog } from "../../services/blog.service";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAdminBlogs({
        search,
        status,
        category,
      });
      setBlogs(data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search, status, category]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    try {
      await deleteBlog(id);
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter((blog) => blog.status === "published").length;
  const draftBlogs = blogs.filter((blog) => blog.status === "draft").length;

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Blogs</h1>

        <Link to="/blogs/add" className="admin-primary-button px-5 py-2">
          + Create Blog
        </Link>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="admin-card p-5">
          <p className="text-sm text-gray-500">Total blogs</p>
          <p className="mt-2 text-3xl font-bold">{totalBlogs}</p>
        </div>
        <div className="admin-card p-5">
          <p className="text-sm text-gray-500">Published blogs</p>
          <p className="mt-2 text-3xl font-bold">{publishedBlogs}</p>
        </div>
        <div className="admin-card p-5">
          <p className="text-sm text-gray-500">Draft blogs</p>
          <p className="mt-2 text-3xl font-bold">{draftBlogs}</p>
        </div>
      </div>

      <div className="admin-card mb-6 p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title"
            className="w-full rounded-xl border px-4 py-2"
          />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-xl border px-4 py-2"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-xl border px-4 py-2"
          >
            <option value="">All Categories</option>
            <option value="Parenting Tips">Parenting Tips</option>
            <option value="Toy Guides">Toy Guides</option>
            <option value="Learning">Learning</option>
            <option value="Gift Ideas">Gift Ideas</option>
            <option value="Kids Activities">Kids Activities</option>
            <option value="News & Updates">News & Updates</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="admin-table-wrap overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left">Cover</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Published</th>
                <th className="px-4 py-3 text-left">Updated</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-t">
                  <td className="px-4 py-3">
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt={blog.title} className="h-14 w-14 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">No Image</div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{blog.title}</td>
                  <td className="px-4 py-3">{blog.category}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "—"}</td>
                  <td className="px-4 py-3">{blog.updatedAt ? new Date(blog.updatedAt).toLocaleDateString() : "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <Link to={`/blogs/edit/${blog._id}`} className="mr-4 text-blue-600 hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:underline">Delete</button>
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

export default Blogs;
