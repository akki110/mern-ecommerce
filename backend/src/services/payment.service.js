const razorpay = require('../utils/razorpay');
const crypto = require('crypto');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

/**
 * @desc Create Razorpay Order  
 */
exports.createRazorpayOrder = async (amount) => {
    const options = {
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        throw new ApiError(500, "Failed to create Razorpay order");
    }
}

/**
 * @desc Verify Razorpay Signature and Create Order
 */
exports.verifyPayment = async (orderId, paymentId, signature, userId, addressInfo) => {
    // 1. Ensure keys exist
    if (!orderId || !paymentId || !signature) {
        throw new ApiError(400, "Missing payment details");
    }

    // 2. Generate the expected signature
    const secret = process.env.RAZORPAY_SECRET;

    const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(orderId + "|" + paymentId)
        .digest("hex");

    if (generated_signature !== signature) {
        throw new ApiError(400, "Invalid payment signature");
    }

    // 3. Signature is valid! Now create the Order in MongoDB
    // Fetch the user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
        throw new ApiError(404, "Cart is empty");
    }

    // Calculate total price (server-side for security)
    const totalPrice = cart.items.reduce((acc, item) => {
        if (item.product) {
            return acc + (item.product.price * item.quantity);
        }
        return acc;
    }, 0);

    // 4. Save to Order Model
    const orderData = {
        user: userId,
        orderItems: cart.items
            .filter(item => item.product) // Safety check
            .map(item => ({
                name: item.product.name,
                qty: item.quantity,
                image: item.product.images?.[0] || item.product.image || "",
                price: item.product.price,
                product: item.product._id
            })),
        shippingAddress: addressInfo || {
            address: "Default Address",
            city: "Default City",
            postalCode: "000000",
            country: "India"
        },
        paymentMethod: "Razorpay",
        paymentResult: {
            razorpay_order_id: orderId,
            razorpay_payment_id: paymentId,
            razorpay_signature: signature
        },
        totalPrice: totalPrice,
        isPaid: true,
        paidAt: Date.now()
    };

    const order = await Order.create(orderData);

    // 5. Clear the user's cart after successful order
    cart.items = [];
    await cart.save();

    return new ApiResponse(201, order, "Order placed successfully");
};
