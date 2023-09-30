const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

router.post('/', orderController.addOrders); // /orders

router.get('/', orderController.getOrders);

router.get('/success', orderController.getSuccess);

router.get('/failure', orderController.getFailure);


module.exports = router;
