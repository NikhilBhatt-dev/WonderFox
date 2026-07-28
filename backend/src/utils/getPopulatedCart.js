import Cart from "../models/Cart.js";

const getPopulatedCart = async (cartId) => {
  return await Cart.findById(cartId)
    .populate("items.product", "name price discountPrice images stock isActive")
    .populate("user", "name email");
};

export default getPopulatedCart;
