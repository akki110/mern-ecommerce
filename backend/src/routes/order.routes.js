const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const orderController = require('../controllers/order.controller');

router.get('/myorders', auth('user'), orderController.getMyOrders);
router.get('/:id', auth('user'), orderController.getOrderById);
module.exports = router;
