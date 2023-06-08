const { Product } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const products = await Product.findAll();
      return res.status(200).json({
        status: true,
        message: "Show all product success",
        data: products,
      });
    } catch (error) {
      throw error;
    }
  },

  showDetail: async (req, res, next) => {
    try {
      const { product_id } = req.params;

      const product = await Product.findOne({ where: { id: product_id } });

      if (!product) {
        return res.status(404).json({
          status: false,
          message: `can't find product with id, product id not found!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "get detail product id success",
        data: product,
      });
    } catch (error) {
      throw error;
    }
  },

  store: async (req, res, next) => {
    try {
      const { name, quantity } = req.body;

      const exist = await Product.findOne({ where: { name } });

      if (exist) {
        return res.status(400).json({
          status: false,
          message: "name already exist",
        });
      }

      const product = await Product.create({
        name: name,
        quantity: quantity,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: product,
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res, next) => {
    try {
      //get id from params
      const { product_id } = req.params;

      const updated = await Product.update(req.body, {
        where: { id: product_id },
      });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `can't find product with id product!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "update product with id success",
        data: null,
      });
    } catch (error) {
      throw error;
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { product_id } = req.params;

      const deleted = await Product.destroy({ where: { id: product_id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `can't find product with product id!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: null,
      });
    } catch (error) {
      throw error;
    }
  },
};
