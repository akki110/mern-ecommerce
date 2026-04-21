const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    countInStock: Joi.number().required(),
    isSale: Joi.boolean().default(false),
    image: Joi.string().optional(), // Optional because it might come from req.file
});

module.exports = { productSchema };
