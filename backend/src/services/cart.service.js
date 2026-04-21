const Cart = require('../models/cart.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc Get Cart (Auto-creates if not exists, populates product details)
 */
exports.getCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate('items.product');

    // If no cart exists, create an empty one for the user
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }

    return new ApiResponse(200, cart, "Cart fetched successfully");
};

/**
 * @desc Add Item to Cart (Handles both existing and new items)
 */
exports.addItemToCart = async (userId, productId, quantity) => {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        // Product exists, update quantity
        cart.items[itemIndex].quantity += (quantity || 1);
    } else {
        // Product is new, add it
        cart.items.push({ product: productId, quantity: (quantity || 1) });
    }

    await cart.save();

    // Return populated cart
    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    return new ApiResponse(200, updatedCart, "Item added to cart successfully");
};

/**
 * @desc Remove Item from Cart
 */
exports.removeItemFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    return new ApiResponse(200, updatedCart, "Item removed from cart successfully");
};

/**
 * @desc Update Item Quantity in Cart
 */
exports.updateItemQuantity = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) {
        throw new ApiError(404, "Item not found in cart");
    }

    item.quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    return new ApiResponse(200, updatedCart, "Item quantity updated successfully");
};

/**
 * @desc Clear Cart (Useful after successful order)
 */
exports.clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
        cart.items = [];
        await cart.save();
    }
    return new ApiResponse(200, {}, "Cart cleared successfully");
};
