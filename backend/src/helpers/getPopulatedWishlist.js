const getPopulatedWishlist = (query) => {
  return query.populate({
    path: "items.product",
    select: "name price discountPrice stock isActive images",
  });
};

export default getPopulatedWishlist;
