const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_CHARGE = 100;
const DEFAULT_TAX = 0;

const calculateOrderTotal = (
  orderItems,
  { shippingPrice, taxPrice = DEFAULT_TAX } = {},
) => {
  const itemsPrice = orderItems.reduce((total, item) => {
    const itemPrice = item.discountPrice > 0 ? item.discountPrice : item.price;

    return total + itemPrice * item.quantity;
  }, 0);

  const finalShippingPrice =
    shippingPrice ??
    (itemsPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE);

  const totalPrice = itemsPrice + finalShippingPrice + taxPrice;

  return {
    itemsPrice,
    shippingPrice: finalShippingPrice,
    taxPrice,
    totalPrice,
  };
};

export default calculateOrderTotal;
