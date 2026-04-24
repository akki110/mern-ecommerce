const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc Create Product
 */
exports.createProduct = async (productData) => {
    const product = await Product.create(productData);
    return new ApiResponse(201, product, "Product created successfully");
};

/**
 * @desc Get All Products with Filtering, Search, and Sorting
 */
exports.getAllProducts = async (filters = {}) => {
    const { category, minPrice, maxPrice, sort, isSale, q, brand, inStock, new: isNew } = filters;

    let query = {};

    // Search logic (Category, Name, or Brand)
    if (q) {
        query.$or = [
            { name: { $regex: q, $options: 'i' } },
            { brand: { $regex: q, $options: 'i' } },
            { category: { $regex: q, $options: 'i' } },
        ];
    }

    // Category filter
    if (category) query.category = category;

    // Brand filter
    if (brand) query.brand = brand;

    // Availability filter
    if (inStock === 'true') {
        query.countInStock = { $gt: 0 };
    }

    // Sale filter
    if (isSale === 'true') query.isSale = true;

    // Price range
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let mongooseQuery = Product.find(query);

    // Sorting logic
    if (isNew === 'true') {
        mongooseQuery = mongooseQuery.sort({ createdAt: -1 }).limit(10);
    } else if (sort === 'oldest') {
        mongooseQuery = mongooseQuery.sort({ createdAt: 1 });
    } else if (sort === 'newest') {
        mongooseQuery = mongooseQuery.sort({ createdAt: -1 });
    } else if (sort === 'price-low') {
        mongooseQuery = mongooseQuery.sort({ price: 1 });
    } else if (sort === 'price-high') {
        mongooseQuery = mongooseQuery.sort({ price: -1 });
    } else {
        mongooseQuery = mongooseQuery.sort({ createdAt: -1 }); // Default: Newest First
    }

    const products = await mongooseQuery;
    return new ApiResponse(200, products, "Products fetched successfully");
};

/**
 * @desc Get Product By Id
 */
exports.getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(404, 'Product not found');
    }
    return new ApiResponse(200, product, "Product fetched successfully");
};

/**
 * @desc Product Update
 */
exports.updateProduct = async (id, updateData) => {
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!product) {
        throw new ApiError(404, 'Product not found');
    }
    return new ApiResponse(200, product, "Product updated successfully");
};

/**
 * @desc Product Delete
 */
exports.deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        throw new ApiError(404, 'Product not found');
    }
    return new ApiResponse(200, product, "Product deleted successfully");
};

/**
 * @desc Search Product
 */
exports.searchProduct = async (searchQuery) => {
    if (!searchQuery) throw new ApiError(400, "Search term is required");
    const products = await Product.find({
        $or: [
            { name: { $regex: searchQuery, $options: 'i' } },
            { brand: { $regex: searchQuery, $options: 'i' } },
            { category: { $regex: searchQuery, $options: 'i' } }
        ]
    });
    return new ApiResponse(200, products, "Products fetched successfully");
};

/**
 * @desc Get Latest Products
 */
exports.getLatestProducts = async () => {
    const products = await Product.find().sort({ createdAt: -1 }).limit(10);
    return new ApiResponse(200, products, "Latest products fetched successfully");
};

/**
 * @desc Get Sale Products
 */
exports.getSaleProducts = async () => {
    const products = await Product.find({ isSale: true });
    return new ApiResponse(200, products, "Sale products fetched successfully");
};
