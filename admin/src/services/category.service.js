import api from "../api/axios";

export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data.data.categories;
};

export const createCategory = async (categoryData) => {
  const { data } = await api.post("/categories", categoryData);
  return data;
};

export const updateCategory = async (id, categoryData) => {
  const { data } = await api.put(`/categories/${id}`, categoryData);
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};

export const getCategory = async (id) => {
  const { data } = await api.get(`/categories/${id}`);
  return data.data.category;
};
