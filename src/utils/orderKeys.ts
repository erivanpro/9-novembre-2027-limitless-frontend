type OrderListItem = {
  id?: string | number | null;
  booking?: {
    id?: string | number | null;
  } | null;
};

export const getOrderListKey = (item: OrderListItem, index: number) => {
  const orderId = item?.id;
  const bookingId = item?.booking?.id;

  if (orderId != null && bookingId != null) {
    return `order-${String(orderId)}-booking-${String(bookingId)}`;
  }

  if (orderId != null) {
    return `order-${String(orderId)}`;
  }

  if (bookingId != null) {
    return `booking-${String(bookingId)}`;
  }

  return `order-index-${index}`;
};
