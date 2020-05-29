// Criar tabelas no banco de dados pelo Sequelize

const CartItem = require('../models/cartItem');
const Order = require('../models/order');
const Product = require('../models/product');
module.exports = () => {
  CartItem.sync({force: true}).then(() => {
    console.log('Tabela cartItem criada pelo sequelize.');
  });
  
  Order.sync({force: true}).then(() => {
    console.log('Tabela order criada pelo sequelize.');
  });
  
  Product.sync({force: true}).then(() => {
    console.log('Tabela product criada pelo sequelize.');
  });
}
