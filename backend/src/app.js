const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use(helmet({
    crossOriginResourcePolicy: false,
}));

app.use(morgan('dev'));

app.use('/upload', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/payment', require('./routes/payment.routes'));

// Health Check
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

const { notFound, errorHandler } = require('./middleware/error.middleware');

// error middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;