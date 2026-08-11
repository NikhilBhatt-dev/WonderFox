import api from "../api/axios";

export const getCategories = async () => {
    const { data } = await api.get("/categories");

    return data.data.categories;
};

export const getCategory = async (id) => {
    const { data } = await api.get(`/categories/${id}`);

    return data.data.category;
};