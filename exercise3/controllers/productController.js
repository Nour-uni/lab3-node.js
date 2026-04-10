const Product = require('../models/product');

function getAllProducts(req, res) {
    const products = Product.getAllProducts();
    res.json(products);
}

function getProductById(req, res) {
    const product = Product.getProductById(req.params.id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
}

function createProduct(req, res) {
    const { name, price } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    const newProduct = Product.createProduct({ name, price });
    res.status(201).json(newProduct);
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct
};
