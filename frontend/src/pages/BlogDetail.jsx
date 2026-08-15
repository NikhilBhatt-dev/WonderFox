import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Container from "../component/common/Container";
import { getBlogBySlug } from "../services/blog.service";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogBySlug(slug);
        setBlog(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <section className="bg-[#FFF8F3] py-20">
        <Container>
          <p className="text-center text-gray-500">Loading blog...</p>
        </Container>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="bg-[#FFF8F3] py-20">
        <Container>
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">
            Blog not found.
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-[#FFF8F3] py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600">
            <ArrowLeft size={18} /> Back to Blog
          </Link>

          <div className="overflow-hidden rounded-[30px] border border-orange-100 bg-white shadow-sm">
            <img src={blog.coverImage} alt={blog.title} className="h-[300px] w-full object-cover md:h-[420px]" />

            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="rounded-full bg-orange-50 px-3 py-1 font-medium text-orange-600">{blog.category}</span>
                <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{blog.author}</span>
              </div>

              <h1 className="mt-5 text-3xl font-black leading-tight text-gray-900 md:text-5xl">{blog.title}</h1>

              <p className="mt-5 text-lg leading-8 text-gray-600">{blog.excerpt}</p>

              {blog.tags?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">#{tag}</span>
                  ))}
                </div>
              )}

              <article
                className="prose prose-lg mt-8 max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-orange-500 prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BlogDetail;
