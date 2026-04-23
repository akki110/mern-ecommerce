const { asyncHandler } = require('../middleware/error.middleware');
const authService = require('../services/auth.service');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, number, country, password } = req.body;

    // Validation is already handled by middleware, so we can jump straight to the service
    const response = await authService.register(firstName, lastName, email, number, country, password);

    res.status(response.statusCode).json(response);
});

/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const response = await authService.login(email, password);

    res.status(response.statusCode).json(response);
});

exports.currentUser = asyncHandler(async (req, res) => {
    const response = await authService.getCurrentUser(req.user.id);

    res.status(response.statusCode).json(response);
});