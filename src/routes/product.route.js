const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const productController = require('../controllers/product.controller');

router.post("/", verifyToken, verifyIsAdmin, productController.createProduct);
router.post('/filter', verifyToken, productController.filterProducts);

module.exports = router;