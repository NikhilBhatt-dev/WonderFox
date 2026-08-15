import api from "../api/axios";

export const getSubscribers = async (params = {}) => {
  const { data } = await api.get("/newsletter/subscribers", { params });
  return data.data.subscribers || [];
};

export const deactivateSubscriber = async (id) => {
  const { data } = await api.delete(`/newsletter/subscribers/${id}`);
  return data;
};

export const sendNewsletter = async (payload) => {
  const { data } = await api.post("/newsletter/send", payload);
  return data.data;
};
