import api from "../api/axios";

export const createCODOrder = async (payload) => {
  const { data } = await api.post("/orders", payload);
  return data;
};

export const createRazorpayOrder = async () => {
  const { data } = await api.post("/orders/razorpay");
  return data.data;
};

export const verifyPayment = async (payload) => {
  const { data } = await api.post("/orders/verify-payment", payload);
  return data;
};

export const getMyOrders = async () => {
  const { data } = await api.get("/orders/my-orders");
  return data.data.orders;
};
