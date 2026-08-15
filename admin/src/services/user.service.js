import api from "../api/axios";

export const getUsers = async () => {
  const { data } = await api.get("/users/admin");
  return data.data.users;
};

export const getUser = async (id) => {
  const { data } = await api.get(`/users/admin/${id}`);
  return data.data.user;
};
