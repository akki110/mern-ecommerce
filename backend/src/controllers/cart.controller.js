const { asyncHandler } = require('../middleware/error.middleware');
const cartService = require('../services/cart.service');

/**
 * @desc Get User Cart
 * @route GET /api/cart
 * @access Private
 */
exports.getCart = asyncHandler(async (req, res) => {
    const response = await cartService.getCart(req.user.id);
    res.status(response.statusCode).json(response);
});

/**
 * @desc Add Item to Cart
 * @route POST /api/cart/add
 * @access Private
 */
exports.addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const response = await cartService.addItemToCart(req.user.id, productId, quantity);
    res.status(response.statusCode).json(response);
});

/**
 * @desc Update Item Quantity
 * @route PATCH /api/cart/update
 * @access Private
 */
exports.updateQuantity = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const response = await cartService.updateItemQuantity(req.user.id, productId, quantity);
    res.status(response.statusCode).json(response);
});

/**
 * @desc Remove Item from Cart
 * @route DELETE /api/cart/remove/:productId
 * @access Private
 */
exports.removeItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const response = await cartService.removeItemFromCart(req.user.id, productId);
    res.status(response.statusCode).json(response);
});

/**
 * @desc Clear Cart
 * @route DELETE /api/cart/clear
 * @access Private
 */
exports.clear = asyncHandler(async (req, res) => {
    const response = await cartService.clearCart(req.user.id);
    res.status(response.statusCode).json(response);
});
