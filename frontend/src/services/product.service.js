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

export const getProductReviews = async (id) => {
    const { data } = await api.get(`/products/${id}/reviews`);
    return data.data.reviews;
};

export const saveProductReview = async (id, review) => {
    const { data } = await api.post(`/products/${id}/reviews`, review);
    return data.data;
};
