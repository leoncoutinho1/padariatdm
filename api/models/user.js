const Sequelize = require('sequelize');
const { DataTypes, Model} = require('sequelize');


class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;

