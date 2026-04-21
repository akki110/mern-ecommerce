const jwt = require('jsonwebtoken');

const auth = (roles = []) => (req, res, next) => {
    if (typeof roles === 'string' && roles.length > 0) {
        roles = [roles];
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        if (roles.length > 0 && !roles.includes(decode.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = auth;