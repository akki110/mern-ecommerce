const ApiError = require('../utils/ApiError');

/**
 * Middleware to validate request body against a Joi schema
 * @param {Object} schema - Joi schema object
 * @returns {Function} - Express middleware function
 */
const validate = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body, {
        abortEarly: false, // Include all errors, not just the first one
        allowUnknown: true, // Allow fields that are not in the schema
        stripUnknown: true, // Remove fields that are not in the schema
    });

    if (error) {
        const errorMessage = error.details
            .map((detail) => detail.message)
            .join(', ');

        throw new ApiError(400, errorMessage);
    }

    // Replace req.body with the validated and stripped value
    Object.assign(req.body, value);
    next();
};

module.exports = { validate };
