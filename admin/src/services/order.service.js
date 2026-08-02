import api from "../api/axios";

export const getOrders = async () => {
  const { data } = await api.get("/orders/admin");

  return data.data.orders;
};

export const getOrder = async (id) => {
  const { data } = await api.get(`/orders/admin/${id}`);

  return data.data.order;
};

export const updateOrderStatus = async (id, orderStatus) => {
  const { data } = await api.patch(`/orders/admin/${id}/status`, {
    orderStatus,
  });

  return data;
};
