const sequelize = require('../utils/database');
const { DataTypes, Model } = require('sequelize');

class Order extends Model {}

Order.init({
  seller: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
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
