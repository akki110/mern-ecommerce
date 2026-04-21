const razorpay = require('../utils/razorpay');
const crypto = require('crypto');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

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
 * @desc Verify Razorpay Signature
 */
exports.verifyPayment = async (orderId, paymentId, signature) => {
    // 1. Ensure keys exist
    if (!orderId || !paymentId || !signature) {
        throw new ApiError(400, "Missing payment details");
    }

    // 2. Generate the expected signature
    // Make sure process.env.RAZORPAY_SECRET matches your .env exactly!
    const secret = process.env.RAZORPAY_SECRET;

    const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(orderId + "|" + paymentId)
        .digest("hex");

    if (generated_signature === signature) {
        return new ApiResponse(200, { verified: true }, "Payment Verified Successfully");
    } else {
        // Log this to your terminal to debug!
        console.log("Signature Mismatch!");
        console.log("Generated:", generated_signature);
        console.log("Received:", signature);
        throw new ApiError(400, "Invalid payment signature");
    }
};
