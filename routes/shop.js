const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');
const productController = require('../api/controllers/productController');

router.get('/', shopController.getIndex);

router.get('/products', productController.fetchAll);



// router.get('/find/:id', shopController.find);

// router.post('/createvenda', shopController.createVenda);

module.exports = router;