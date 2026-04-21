const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// routes
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/products', require('./routes/product.routes'));
// app.use('/api/payments', require('./routes/payment.routes'));

// Health Check
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// error middleware
// app.use(errorMiddleware);

module.exports = app;