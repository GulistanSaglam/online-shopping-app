const express = require("express");
const router = express.Router();

const imageUploadMiddleware = require('../middlewares/image-upload');

const adminController = require("../controllers/admin.controller");


//routes
router.get("/products", adminController.getAllProducts);

router.get("/products/new", adminController.getNewProducts);

router.post("/products", imageUploadMiddleware, adminController.createNewProduct);

router.get('/products/:id', adminController.getUpdateProduct);

router.post('/products/:id',imageUploadMiddleware, adminController.updateProduct);

router.delete('/products/:id', adminController.deleteProduct);

router.get('/orders', adminController.getOrders);

router.patch('/orders/:id', adminController.updateOrder);

module.exports = router;
