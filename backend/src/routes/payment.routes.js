const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const auth = require('../middleware/auth.middleware');

router.post('/create', auth('user'), paymentController.createOrder);
router.post('/verify', auth('user'), paymentController.verifyPayment);

module.exports = router;
