import api from "../api/axios";

export const getPublishedBlogs = async () => {
  const { data } = await api.get("/blogs");
  return data.data.blogs || [];
};

export const getBlogBySlug = async (slug) => {
  const { data } = await api.get(`/blogs/${slug}`);
  return data.data.blog;
};
