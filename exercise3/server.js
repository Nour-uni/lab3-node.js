const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// General Error Handler
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`✅ Exercise 3 (MVC Structure) Server running on http://localhost:${PORT}`);
});
