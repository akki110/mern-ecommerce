export const BASE_URL = "http://localhost:5000";

export const API_ENDPOINTS = {
  PRODUCT: `${BASE_URL}/api/products`,
  AUTH: `${BASE_URL}/api/auth`,
  CART: `${BASE_URL}/api/cart`,
  ORDER: `${BASE_URL}/api/order`,
  PAYMENT: `${BASE_URL}/api/payment`,
};

export const ORDER_STATUS = {
  PENDING: "Pending",
  SUCCESS: "Success",
  CANCELLED: "Cancelled",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
};
