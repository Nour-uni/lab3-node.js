const products = [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Wireless Mouse', price: 29.99 },
    { id: 3, name: 'Mechanical Keyboard', price: 149.99 }
];

function getAllProducts() {
    return products;
}

function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

function createProduct(productData) {
    const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...productData
    };
    products.push(newProduct);
    return newProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct
};
