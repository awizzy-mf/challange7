'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Component extends Model {

    static associate(models) {
      // define association here
    }
  }
  Product_Component.init({
    product_id: DataTypes.INTEGER,
    component_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_Component',
  });
  return Product_Component;
};