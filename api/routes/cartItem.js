const cartItemController = require('../controllers/cartItemController');

const express = require('express');
const router = express.Router();

router.get('/cartitems/*', cartItemController.findByAttrib);

router.get('/cartitems', cartItemController.fetchAll);

router.post('/cartitems', cartItemController.createCartItem);

router.put('/cartitems', cartItemController.udpateCartItem);

router.delete('/cartitems', cartItemController.deleteCartItem);

module.exports = router;