import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Container from "../component/common/Container";
import { getPublishedBlogs } from "../services/blog.service";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getPublishedBlogs();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="bg-[#FFF8F3] py-10 sm:py-20">
      <Container>
        <div className="mb-12 text-center">
          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            WonderFox Journal
          </span>
          <h1 className="mt-5 text-3xl font-black text-gray-900 sm:text-4xl md:text-5xl">Playful ideas for growing minds</h1>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-5 text-center text-gray-500 sm:p-10">
            No published blogs available yet.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <article key={blog._id} className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <img src={blog.coverImage} alt={blog.title} className="h-64 w-full object-cover" />

                <div className="p-6">
                  <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                    {blog.category}
                  </span>

                  <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900">{blog.title}</h2>
                  <p className="mt-3 text-sm text-gray-500">{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</p>

                  <p className="mt-4 text-base leading-7 text-gray-600">{blog.excerpt}</p>

                  <Link to={`/blog/${blog.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-500 hover:text-orange-600">
                    Read More <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Blog;
