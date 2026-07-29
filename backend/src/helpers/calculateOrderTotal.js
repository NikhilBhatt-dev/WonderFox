const DEFAULT_SHIPPING_CHARGE = 0;
const DEFAULT_TAX = 0;

const calculateOrderTotal = (
  orderItems,
  { shippingPrice = DEFAULT_SHIPPING_CHARGE, taxPrice = DEFAULT_TAX } = {},
) => {
  const itemsPrice = orderItems.reduce((total, item) => {
    const itemPrice = item.discountPrice > 0 ? item.discountPrice : item.price;

    return total + itemPrice * item.quantity;
  }, 0);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};

export default calculateOrderTotal;
