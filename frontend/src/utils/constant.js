export const BASE_URL = "http://localhost:5000/api";

export const API_ENDPOINTS = {
  PRODUCT: `${BASE_URL}/product`,
  AUTH: `${BASE_URL}/auth`,
  ORDER: `${BASE_URL}/order`,
  PAYMENT: `${BASE_URL}/payment`,
};

export const ORDER_STATUS = {
  PENDING: "Pending",
  SUCCESS: "Success",
  CANCELLED: "Cancelled",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
};
