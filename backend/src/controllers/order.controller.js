const { asyncHandler } = require('../middleware/error.middleware');
const orderService = require('../services/order.service');

/**
 * @desc Get logged in user orders
 * @route GET /api/orders/myorders
 * @access Private
 */
exports.getMyOrders = asyncHandler(async (req, res) => {
    const orders = await orderService.getMyOrders(req.user.id);
    res.status(orders.statusCode).json(orders);
});

/**
 * @desc Get Order by ID
 * @route GET /api/orders/:id
 * @access Private
 */
exports.getOrderById = asyncHandler(async (req, res) => {
    const order = await orderService.getOrderById(req.params.id);
    res.status(order.statusCode).json(order);
});