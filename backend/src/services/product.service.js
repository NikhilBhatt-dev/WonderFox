// import Product from "../models/Product.js";
// import Category from "../models/Category.js";
// import ApiError from "../utils/ApiError.js";
// import ApiResponse from "../utils/ApiResponse.js";

// export const createProduct = async (productData, userId) => {
//   const {
//     name,
//     description,
//     price,
//     discountPrice,
//     category,
//     stock,
//     brand,
//     isFeatured,
//   } = productData;

//   // Basic validation
//   if (!name || !description || !price || !category) {
//     throw new ApiError(400, "Please fill all required fields");
//   }

//   // Check if category exists
//   const existingCategory = await Category.findById(category);

//   if (!existingCategory) {
//     throw new ApiError(404, "Category not found");
//   }

//   const product = await Product.create({
//     name,
//     description,
//     price,
//     discountPrice,
//     category,
//     stock,
//     brand,
//     isFeatured,
//     createdBy: userId,
//   });

//   return new ApiResponse(201, { product }, "Product created successfully");
// };

// export const getAllProducts = async (queryParams) => {
//   const {
//     search,
//     category,
//     minPrice,
//     maxPrice,
//     page = 1,
//     limit = 10,
//     sort = "-createdAt",
//   } = queryParams;

//   const filter = {};

//   // Search by product name
//   if (search) {
//     filter.name = {
//       $regex: search,
//       $options: "i",
//     };
//   }

//   // Filter by category
//   if (category) {
//     filter.category = category;
//   }

//   // Filter by price
//   if (minPrice || maxPrice) {
//     filter.price = {};

//     if (minPrice) {
//       filter.price.$gte = Number(minPrice);
//     }

//     if (maxPrice) {
//       filter.price.$lte = Number(maxPrice);
//     }
//   }

//   // Pagination
//   const currentPage = Math.max(1, Number(page));
//   const perPage = Math.max(1, Number(limit));
//   const skip = (currentPage - 1) * perPage;

//   // Total matching products
//   const totalProducts = await Product.countDocuments(filter);

//   // Fetch products
//   const products = await Product.find(filter)
//     .populate("createdBy", "name email")
//     .populate("category", "name description")
//     .sort(sort)
//     .skip(skip)
//     .limit(perPage);

//   return new ApiResponse(
//     200,
//     {
//       products,
//       pagination: {
//         totalProducts,
//         currentPage,
//         perPage,
//         totalPages: Math.ceil(totalProducts / perPage),
//       },
//     },
//     "Products fetched successfully",
//   );
// };

// export const getProductById = async (id) => {
//   const product = await Product.findById(id)
//     .populate("createdBy", "name email")
//     .populate("category", "name description");

//   if (!product) {
//     throw new ApiError(404, "Product not found");
//   }

//   return new ApiResponse(200, { product }, "Product fetched successfully");
// };

// export const updateProduct = async (id, updateData) => {
//   // If category is being updated, verify it exists
//   if (updateData.category) {
//     const existingCategory = await Category.findById(updateData.category);

//     if (!existingCategory) {
//       throw new ApiError(404, "Category not found");
//     }
//   }

//   const product = await Product.findById(id);

//   if (!product) {
//     throw new ApiError(404, "Product not found");
//   }

//   Object.assign(product, updateData);

//   await product.save();

//   return new ApiResponse(200, { product }, "Product updated successfully");
// };

// export const deleteProduct = async (id) => {
//   const product = await Product.findById(id);

//   if (!product) {
//     throw new ApiError(404, "Product not found");
//   }

//   await product.deleteOne();

//   return new ApiResponse(200, null, "Product deleted successfully");
// };

import Product from "../models/Product.js";
import Category from "../models/Category.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createProduct = async (productData, userId) => {
  const {
    name,
    description,
    price,
    discountPrice,
    category,
    stock,
    brand,
    isFeatured,
  } = productData;

  // Basic validation
  if (!name || !description || !price || !category) {
    throw new ApiError(400, "Please fill all required fields");
  }

  // Check if category exists
  const existingCategory = await Category.findById(category);

  if (!existingCategory) {
    throw new ApiError(404, "Category not found");
  }

  const product = await Product.create({
    name,
    description,
    price,
    discountPrice,
    category,
    stock,
    brand,
    isFeatured,
    createdBy: userId,
  });

  return new ApiResponse(201, { product }, "Product created successfully");
};

export const getAllProducts = async (queryParams) => {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    sort = "-createdAt",
  } = queryParams;

  const filter = {};

  // Search by product name
  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  // Filter by category
  if (category) {
    filter.category = category;
  }

  // Filter by price
  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  // Allowed sort fields
  const allowedSortFields = [
    "price",
    "-price",
    "createdAt",
    "-createdAt",
    "name",
    "-name",
  ];

  const sortOption = allowedSortFields.includes(sort) ? sort : "-createdAt";

  // Pagination
  const currentPage = Math.max(1, Number(page));
  const perPage = Math.max(1, Number(limit));
  const skip = (currentPage - 1) * perPage;

  // Total matching products
  const totalProducts = await Product.countDocuments(filter);

  // Fetch products
  const products = await Product.find(filter)
    .populate("createdBy", "name email")
    .populate("category", "name description")
    .sort(sortOption)
    .skip(skip)
    .limit(perPage);

  return new ApiResponse(
    200,
    {
      products,
      pagination: {
        totalProducts,
        currentPage,
        perPage,
        totalPages: Math.ceil(totalProducts / perPage),
      },
    },
    "Products fetched successfully",
  );
};

export const getProductById = async (id) => {
  const product = await Product.findById(id)
    .populate("createdBy", "name email")
    .populate("category", "name description");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return new ApiResponse(200, { product }, "Product fetched successfully");
};

export const updateProduct = async (id, updateData) => {
  // If category is being updated, verify it exists
  if (updateData.category) {
    const existingCategory = await Category.findById(updateData.category);

    if (!existingCategory) {
      throw new ApiError(404, "Category not found");
    }
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  Object.assign(product, updateData);

  await product.save();

  return new ApiResponse(200, { product }, "Product updated successfully");
};

export const deleteProduct = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await product.deleteOne();

  return new ApiResponse(200, null, "Product deleted successfully");
};