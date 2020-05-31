const sequelize = require('../utils/database');
const { DataTypes, Model } = require('sequelize');
const Product = require('../models/product');
const Order = require('../models/order');

class CartItem extends Model {}

CartItem.init({
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id'
    }
  },
  product: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  qty: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'cartItem'
});


module.exports = CartItem;
