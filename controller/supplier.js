const { Supplier } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const suppliers = await Supplier.findAll();
      return res.status(200).json({
        status: true,
        message: "Show all supplier success",
        data: suppliers,
      });
    } catch (error) {
      throw error;
    }
  },

  showDetail: async (req, res, next) => {
    try {
      const { supplier_id } = req.params;

      const supplier = await Supplier.findOne({ where: { id: supplier_id } });

      if (!supplier) {
        return res.status(404).json({
          status: false,
          message: `can't find supplier with id, supplier id not found!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "get detail supplier id success",
        data: supplier,
      });
    } catch (error) {
      throw error;
    }
  },

  store: async (req, res, next) => {
    try {
      const { name, address } = req.body;

      const exist = await Supplier.findOne({ where: { name } });

      if (exist) {
        return res.status(400).json({
          status: false,
          message: "name already exist",
        });
      }

      const supplier = await Supplier.create({
        name: name,
        address: address,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: supplier,
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res, next) => {
    try {
      const { supplier_id } = req.params;

      const updated = await Supplier.update(req.body, {
        where: { id: supplier_id },
      });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `can't find supplier with id supplier!`,
          data: null,
        });
      }

      //   return response
      return res.status(201).json({
        status: true,
        message: "update supplier with id success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { supplier_id } = req.params;

      const deleted = await Supplier.destroy({ where: { id: supplier_id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `can't find supplier with supplier id!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
