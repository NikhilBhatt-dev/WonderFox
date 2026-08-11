import api from "../api/axios";

export const getProducts = async (params = {}) => {
    const { data } = await api.get("/products", {
        params,
    });

    return data.data;
};

export const getProduct = async (id) => {
    const { data } = await api.get(`/products/${id}`);

    return data.data.product;
};