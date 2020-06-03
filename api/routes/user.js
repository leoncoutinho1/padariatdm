const userController = require('../controllers/userController');

const express = require('express');
const router = express.Router();

router.get('/users/*', userController.findByAttrib);

router.get('/users/:id', userController.findById);

router.get('/users', userController.fetchAll);

router.post('/users', userController.createUser);

router.put('/users', userController.updateUser);

router.delete('/users', userController.deleteUser);

module.exports = router;