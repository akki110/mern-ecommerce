const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate.middleware');
const { productSchema } = require('../validations/product.validation');
const productController = require('../controllers/product.controller');
const upload = require('../middleware/upload.middleware');

// Public Routes
router.get('/', productController.getAll);
router.get('/latest', productController.latest);
router.get('/sale', productController.sale);
router.get('/:id', productController.getById);

// Admin Routes (Add auth(['admin']) later)
router.post('/', upload.single('image'), validate(productSchema), productController.create);
router.put('/:id', upload.single('image'), validate(productSchema), productController.update);
router.delete('/:id', productController.delete);

module.exports = router;
