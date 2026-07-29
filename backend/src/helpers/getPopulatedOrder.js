const getPopulatedOrder = (query) => {
  return query
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "items.product",
      select: "name slug images isActive stock",
    })
    .lean();
};

export default getPopulatedOrder;
