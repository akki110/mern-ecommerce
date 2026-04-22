const Order = require('../models/order.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

/**
 * @desc Get logged in user orders
 */
exports.getMyOrders = async (userId) => {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    return new ApiResponse(200, orders, 'Orders fetched successfully');
};

/**
 * @desc Get order by id
 */
exports.getOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate('user', 'name email');

    if (!order) {
        throw new ApiError(404, 'Order not found');
    }

    return new ApiResponse(200, order, 'Order fetched successfully');
};