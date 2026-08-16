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
  try {
    console.log("🔍 Verify Payment Payload:", payload);
    const { data } = await api.post("/orders/verify-payment", payload);
    console.log("✅ Verify Payment Response:", data);
    return data;
  } catch (error) {
    console.error("❌ Verify Payment Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getMyOrders = async () => {
  const { data } = await api.get("/orders");
  return data.data.orders;
};