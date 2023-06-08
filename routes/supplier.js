const express = require("express");
const suppliers = require("../controller/supplier.js")

const router = express.Router();

router.get('/suppliers', suppliers.index);
router.get('/suppliers/:supplier_id', suppliers.showDetail);
router.post('/suppliers', suppliers.store);
router.put('/suppliers/:supplier_id', suppliers.update);
router.delete('/suppliers/:supplier_id', suppliers.destroy);

module.exports = router;