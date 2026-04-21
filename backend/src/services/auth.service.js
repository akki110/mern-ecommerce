const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { generateToken } = require('../utils/jwt');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (name, email, password) => {

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role: 'user'
    });

    // Create cart for new user
    const cart = await Cart.create({
        user: user._id,
    });

    // Remove password from response
    user.password = undefined;

    return new ApiResponse(201, { user, cart }, "User registered successfully");
};

/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (email, password) => {

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Check if password matches
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Generate token
    const token = generateToken(user);

    // Get user's cart
    const cart = await Cart.findOne({ user: user._id });

    // Remove password from response
    user.password = undefined;

    return new ApiResponse(200, { user, token, cart }, "Login successful");
};

/**
 * @desc Get current logged in user
 * @route GET /api/auth/me
 * @access Private
 */
exports.getCurrentUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return new ApiResponse(200, user, "User fetched successfully");
};
