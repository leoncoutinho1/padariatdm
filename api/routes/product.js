const productController = require('../controllers/productController');

const express = require('express');
const router = express.Router();

router.get('/products/*', productController.findByAttrib);

router.get('/products/:code', productController.findByCode);

router.get('/products', productController.fetchAll);

router.post('/products', productController.createProduct);

router.put('/products', productController.udpateProduct);

router.delete('/products', productController.deleteProduct);

module.exports = router;