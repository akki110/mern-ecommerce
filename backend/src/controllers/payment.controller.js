const paymentService = require('../services/payment.service');
const { asyncHandler } = require('../middleware/error.middleware');
const ApiResponse = require('../utils/ApiResponse');


/**
 * @desc Create payment order
 * @route POST /api/payment/create
 * @access Private
 */
exports.createOrder = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    const response = await paymentService.createRazorpayOrder(amount);

    return res.status(200).json(new ApiResponse(200, response, "Order Created Successfully"))
});

/**
 * @desc Verify Payment
 * @route POST /api/payment/verify
 * @access Private
 */

exports.verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const response = await paymentService.verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    return res.status(200).json(response);
});