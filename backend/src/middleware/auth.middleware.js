const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

/**
 * Middleware to verify JWT and check user roles
 * @param {Array|String} roles - Allowed roles for the route
 */
const auth = (roles = []) => (req, res, next) => {
    try {
        if (typeof roles === 'string') {
            roles = [roles];
        }

        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            throw new ApiError(401, 'Authentication required. Please log in.');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (roles.length > 0 && !roles.includes(decoded.role)) {
            throw new ApiError(403, 'Access denied. You do not have permission.');
        }

        next();
    } catch (error) {
        // If it's already an ApiError, pass it along. 
        // Otherwise, it's likely a JWT verification error (expired/invalid).
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(401, 'Invalid or expired token. Please log in again.'));
        }
    }
};

module.exports = auth;