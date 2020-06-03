// Criar tabelas no banco de dados pelo Sequelize

const sequelize = require('../utils/database');
const CartItem = require('../models/cartItem');
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');

module.exports = async () => {
  await sequelize.drop();
  await User.sync({force: true}).then(() => {
    console.log('Tabela user criada pelo sequelize.');
  });
   
  await Order.sync({force: true}).then(() => {
    console.log('Tabela order criada pelo sequelize.');
  });
  
  await Product.sync({force: true}).then(() => {
    console.log('Tabela product criada pelo sequelize.');
  });

  CartItem.sync({force: true}).then(() => {
    console.log('Tabela cartItem criada pelo sequelize.');
  });
}
