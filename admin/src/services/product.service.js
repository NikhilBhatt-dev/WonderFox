import api from "../api/axios";

export const getProducts = async () => {
  const { data } = await api.get("/products");

  return data.data.products;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);

  return data;
};

export const createProduct = async (productData) => {
  const { data } = await api.post("/products", productData);

  return data;
};

export const getProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`);

  return data.data.product;
};

export const updateProduct = async (id, productData) => {
  const { data } = await api.put(`/products/${id}`, productData);

  return data;
};