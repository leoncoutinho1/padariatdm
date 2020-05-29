const sequelize = require('../utils/database');
const { DataTypes, Model } = require('sequelize');

class Product extends Model {}

Product.init({
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qty: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  cost: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'product'
});

module.exports = Product;
