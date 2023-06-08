const express = require("express");
const products = require("../controller/product.js")

const router = express.Router();

router.get('/products', products.index);
router.get('/products/:product_id', products.showDetail);
router.post('/products', products.store);
router.put('/products/:product_id', products.update);
router.delete('/products/:product_id', products.destroy);

module.exports = router;