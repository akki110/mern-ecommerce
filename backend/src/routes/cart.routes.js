const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const auth = require('../middleware/auth.middleware');

// router.use(auth());

router.get('/', auth('user'), cartController.getCart);
router.post('/add', auth('user'), cartController.addToCart);
router.patch('/update', auth('user'), cartController.updateQuantity);
router.delete('/remove/:productId', auth('user'), cartController.removeItem);
router.delete('/clear', auth('user'), cartController.clear);
module.exports = router;