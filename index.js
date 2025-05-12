require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const setupSwagger = require("./config/swaggerConfig");
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const cors = require('cors');

const app = express();


app.use(
    cors({
        origin: ["https://localhost:7500", "https://fe-example.onrender.com/"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

let corsOptions = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
}

app.use(corsOptions);

connectDB();

// To expect Content-Type: application/json and process
// https://www.geeksforgeeks.org/express-js-express-json-function/

app.use(express.json());
setupSwagger(app);


// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


// starting server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(` Running server on http://localhost:${PORT}`);
});
