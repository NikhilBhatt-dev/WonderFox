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

export const getAllProducts = async () => {
  const products = await Product.find()
    .populate("createdBy", "name email")
    .populate("category", "name description");

  return new ApiResponse(200, { products }, "Products fetched successfully");
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
