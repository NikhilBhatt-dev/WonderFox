import api from "../api/axios";

export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data.data.cart;
};

export const addToCart = async (payload) => {
  const { data } = await api.post("/cart", payload);
  return data;
};

export const updateCart = async (productId, quantity) => {
  const { data } = await api.patch(`/cart/${productId}`, {
    quantity,
  });

  return data.data.cart;
};

export const removeFromCart = async (productId) => {
  const { data } = await api.delete(`/cart/${productId}`);

  return data.data.cart;
};

// 👇 YAHAN ADD KARO
export const clearCart = async () => {
  const { data } = await api.delete("/cart");

  return data.data.cart;
};
