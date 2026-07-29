const buildOrderItemsSnapshot = (validatedItems) => {
  return validatedItems.map(({ product, quantity }) => ({
    product: product._id,

    name: product.name,

    image: product.images?.[0]?.url || "",

    quantity,

    price: product.price,

    discountPrice: product.discountPrice,
  }));
};

export default buildOrderItemsSnapshot;
