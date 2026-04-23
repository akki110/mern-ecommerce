const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    weight: Joi.string().required(),
    countInStock: Joi.number().required(),
    isSale: Joi.boolean().default(false),
    images: Joi.array().items(Joi.string()).optional(),
});

module.exports = { productSchema };
