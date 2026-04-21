const { asyncHandler } = require('../middleware/error.middleware');
const productService = require('../services/product.service');

/**
 * @desc Create Product
 * @route POST /api/product
 * @access Private 
 */
exports.create = asyncHandler(async (req, res) => {
    const productData = {
        ...req.body,
        image: req.file ? req.file.filename : req.body.image
    };
    const response = await productService.createProduct(productData);
    res.status(response.statusCode).json(response);
});

/**
 * @desc Get All Products (with support for sort, search, category, etc.)
 * @route GET /api/product
 * @access Public
 */
exports.getAll = asyncHandler(async (req, res) => {
    const response = await productService.getAllProducts(req.query);
    res.status(response.statusCode).json(response);
});

/**
 * @desc Get Product By Id
 * @route GET /api/product/:id
 * @access Public
 */
exports.getById = asyncHandler(async (req, res) => {
    const response = await productService.getProductById(req.params.id);
    res.status(response.statusCode).json(response);
});

/**
 * @desc Product Update
 * @route PUT /api/product/:id
 * @access Private 
 */
exports.update = asyncHandler(async (req, res) => {
    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.filename;

    const response = await productService.updateProduct(req.params.id, updateData);
    res.status(response.statusCode).json(response);
});

/**
 * @desc Product Delete
 * @route DELETE /api/product/:id
 * @access Private 
 */
exports.delete = asyncHandler(async (req, res) => {
    const response = await productService.deleteProduct(req.params.id);
    res.status(response.statusCode).json(response);
});

/**
 * @desc Get Latest Products
 * @route GET /api/product/latest
 * @access Public
 */
exports.latest = asyncHandler(async (req, res) => {
    const response = await productService.getLatestProducts();
    res.status(response.statusCode).json(response);
});

/**
 * @desc Get Sale Products
 * @route GET /api/product/sale
 * @access Public
 */
exports.sale = asyncHandler(async (req, res) => {
    const response = await productService.getSaleProducts();
    res.status(response.statusCode).json(response);
});