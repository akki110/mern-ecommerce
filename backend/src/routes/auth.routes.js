const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const authController = require('../controllers/auth.controller');
const { validate } = require('../middleware/validate.middleware');
const { registerSchema, loginSchema } = require('../validations/auth.validation');


router.post('/register', validate(registerSchema), authController.registerUser);
router.post('/login', validate(loginSchema), authController.loginUser);
router.get('/me', auth(['user', 'admin']), authController.currentUser);

module.exports = router;
