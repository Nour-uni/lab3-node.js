const express = require('express');
const app = express();

app.use(express.json());

// 1. Create logging middleware
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

// 2. Create auth middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    // Simple mock authentication
    if (token === 'secret-token') {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized. Missing or invalid authorization header.' });
    }
};

// 3. Apply to routes
// Apply logging to ALL routes
app.use(logger);

// Unprotected route
app.get('/public', (req, res) => {
    res.json({ message: 'This is a public route, accessible to anyone!' });
});

// Apply auth to all subsequent routes
app.use(authenticate);

// Protected routes
app.get('/protected', (req, res) => {
    res.json({ message: 'You have accessed the protected route successfully!' });
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`✅ Exercise 2 (Middleware) Server running on http://localhost:${PORT}`);
    console.log(`Note: To test the protected route, send header -> Authorization: secret-token`);
});
