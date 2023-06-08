const { Component } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const components = await Component.findAll();
      return res.status(200).json({
        status: true,
        message: "Show all Component success",
        data: components,
      });
    } catch (error) {
      throw error;
    }
  },

  showDetail: async (req, res, next) => {
    try {
      const { component_id } = req.params;

      const component = await Component.findOne({
        where: { id: component_id },
      });

      if (!component) {
        return res.status(404).json({
          status: false,
          message: `can't find component with id, component id not found!`,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "get detail component id success",
        data: component,
      });
    } catch (error) {
      throw error;
    }
  },

  store: async (req, res, next) => {
    try {
      const { name, description } = req.body;

      const exist = await Component.findOne({ where: { name } });

      if (exist) {
        return res.status(400).json({
          status: false,
          message: "name already exist",
        });
      }

      const component = await Component.create({
        name: name,
        description: description,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: component,
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res, next) => {
    try {
      const { component_id } = req.params;

      const updated = await Component.update(req.body, {
        where: { id: component_id },
      });

      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `can't find component with id component!`,
          data: null,
        });
      }

      //   return response
      return res.status(200).json({
        status: true,
        message: "update component with id success",
        data: null,
      });
    } catch (error) {
      throw error;
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { component_id } = req.params;

      const deleted = await Component.destroy({ where: { id: component_id } });

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `can't find component with component id!`,
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
