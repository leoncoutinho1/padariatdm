const orderController = require('../controllers/orderController');

const express = require('express');
const router = express.Router();

router.get('/orders/*', orderController.findByAttrib);

router.get('/orders', orderController.fetchAll);

router.post('/orders', orderController.createOrder);

router.put('/orders', orderController.udpateOrder);

router.delete('/orders', orderController.deleteOrder);

module.exports = router;