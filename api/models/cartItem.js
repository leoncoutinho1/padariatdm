const sequelize = require('../utils/database');
const { DataTypes, Model } = require('sequelize');

class CartItem extends Model {}

CartItem.init({
  order: {
    type: DataTypes.STRING,
    allowNull: false
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false
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
