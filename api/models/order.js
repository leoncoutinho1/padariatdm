const sequelize = require('../utils/database');
const { DataTypes, Model } = require('sequelize');

class Order extends Model {}

Order.init({
  seller: {
    type: DataTypes.STRING,
    allowNull: false
  },
  discount: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'order'
});

module.exports = Order;
