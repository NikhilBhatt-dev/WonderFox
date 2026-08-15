import api from "../api/axios";

export const getAdminBlogs = async (params = {}) => {
  const { data } = await api.get("/blogs/admin", { params });
  return data.data.blogs;
};

export const createBlog = async (payload) => {
  const { data } = await api.post("/blogs", payload);
  return data.data.blog;
};

export const updateBlog = async (id, payload) => {
  const { data } = await api.put(`/blogs/${id}`, payload);
  return data.data.blog;
};

export const deleteBlog = async (id) => {
  const { data } = await api.delete(`/blogs/${id}`);
  return data;
};
