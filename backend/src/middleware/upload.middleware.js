const multer = require('multer');
const path = require('path');
const ApiError = require('../utils/ApiError');

/**
 * @desc Multer storage configuration
 * @return {Function} - Storage configuration
 * @param {Object} req - Request object
 * @param {Object} file - File object
 * @param {Function} cb - Callback function
 */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new ApiError(400, 'Error: Images only!'));
        }
    },
});

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 } });

module.exports = upload;