import Wishlist from "../models/Wishlist.js";

const getPopulatedWishlist = async (wishlistId) => {
  return Wishlist.findById(wishlistId)
    .populate(
      "items.product",
      "name price discountPrice images stock isActive"
    )
    .populate("user", "name email");
};

export default getPopulatedWishlist;