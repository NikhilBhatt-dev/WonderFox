const blogCategories = [
  "Parenting Tips",
  "Toy Guides",
  "Learning",
  "Gift Ideas",
  "Kids Activities",
  "News & Updates",
];

const BlogForm = ({
  formData,
  loading,
  onChange,
  onSubmit,
  onImageUpload,
  onSaveDraft,
  onPublish,
}) => {
  return (
    <form className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={onChange}
            className="w-full rounded-xl border px-4 py-3"
            placeholder="5 Fun Ways to Make Playtime More Creative"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">Slug</label>
          <input
            name="slug"
            value={formData.slug}
            onChange={onChange}
            className="w-full rounded-xl border px-4 py-3"
            placeholder="fun-ways-to-make-playtime-more-creative"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={onChange}
            rows={3}
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Short summary for the blog card and SEO preview."
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            className="w-full rounded-xl border px-4 py-3"
            required
          >
            <option value="">Select category</option>
            {blogCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            className="w-full rounded-xl border px-4 py-3"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">Tags</label>
          <input
            name="tags"
            value={formData.tags}
            onChange={onChange}
            className="w-full rounded-xl border px-4 py-3"
            placeholder="playtime, learning, creative toys"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">Cover Image URL</label>
          <input
            name="coverImage"
            value={formData.coverImage}
            onChange={onChange}
            className="w-full rounded-xl border px-4 py-3"
            placeholder="https://example.com/cover.jpg"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">Author</label>
          <input
            name="author"
            value={formData.author}
            onChange={onChange}
            className="w-full rounded-xl border px-4 py-3"
            placeholder="WonderFox Editorial"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={onChange}
            rows={12}
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Use HTML for headings, paragraphs, list items, links, and emphasis."
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">Or upload image</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;

              const formDataUpload = new FormData();
              formDataUpload.append("image", file);

              try {
                const response = await fetch(
                  `${import.meta.env.VITE_API_BASE_URL || "https://e-mart-backend-i726.onrender.com/api"}/upload`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: formDataUpload,
                  },
                );

                const json = await response.json();
                if (!response.ok) throw new Error(json.message || "Upload failed");
                onImageUpload(json.data.url || json.data?.image || json.data?.secure_url);
              } catch (error) {
                alert(error.message || "Image upload failed");
              }
            }}
            className="block w-full rounded-xl border border-dashed px-4 py-3"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={onSaveDraft}
          className="border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Draft"}
        </button>

        <button
          type="button"
          onClick={onPublish}
          className="admin-primary-button px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
