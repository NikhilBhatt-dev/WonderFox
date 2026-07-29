import Cart from "../models/Cart.js";
import ApiError from "../utils/ApiError.js";
import getPopulatedCart from "./getPopulatedCart.js";

const getUserCart = async (userId) => {
  const cart = await getPopulatedCart(Cart.findOne({ user: userId }));

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty.");
  }

  return cart;
};

export default getUserCart;
