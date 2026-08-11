// import api from "../api/axios";

// export const getCategories = async () => {
//   const { data } = await api.get("/categories");
//   return data.data.categories;
// };

// export const createCategory = async (categoryData) => {
//   const { data } = await api.post("/categories", categoryData);
//   return data;
// };

// export const updateCategory = async (id, categoryData) => {
//   const { data } = await api.put(`/categories/${id}`, categoryData);
//   return data;
// };

// export const deleteCategory = async (id) => {
//   const { data } = await api.delete(`/categories/${id}`);
//   return data;
// };

// export const getCategory = async (id) => {
//   const { data } = await api.get(`/categories/${id}`);
//   return data.data.category;
// };



import api from "../api/axios";

export const getCategories = async () => {
    const { data } = await api.get("/categories");

    return data.data.categories;
};


export const createCategory = async (categoryData) => {

    const formData = new FormData();

    formData.append("name", categoryData.name);

    formData.append(
        "description",
        categoryData.description || ""
    );

    if (categoryData.image) {
        formData.append(
            "image",
            categoryData.image
        );
    }

    const { data } = await api.post(
        "/categories",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );

    return data;
};


export const updateCategory = async (
    id,
    categoryData
) => {

    const formData = new FormData();

    if (categoryData.name !== undefined) {

        formData.append(
            "name",
            categoryData.name
        );

    }

    if (categoryData.description !== undefined) {

        formData.append(
            "description",
            categoryData.description
        );

    }

    if (categoryData.isActive !== undefined) {

        formData.append(
            "isActive",
            categoryData.isActive
        );

    }

    if (categoryData.image) {

        formData.append(
            "image",
            categoryData.image
        );

    }

    const { data } = await api.put(
        `/categories/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );

    return data;
};


export const deleteCategory = async (id) => {

    const { data } = await api.delete(
        `/categories/${id}`
    );

    return data;
};


export const getCategory = async (id) => {

    const { data } = await api.get(
        `/categories/${id}`
    );

    return data.data.category;
};