const express = require("express");
const products = require("./product.js");
const Components = require("./component.js");
const Supplier = require("./supplier.js");
const User = require('./user');
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
      status: true,
      message: "welcome to auth api!",
      data: null
  })
})

router.get('/error', (req, res) => {
  // const data = {
  //     status: true,
  //     message: 'ga error lagi',
  //     data: null
  // };

  return res.status(200).json(data);
});

router.use(products);
router.use(Components);
router.use(Supplier);
router.use(User);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to express",
  });
});

module.exports = router;
