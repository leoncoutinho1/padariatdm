const express = require('express');

var bodyParser = require('body-parser');

// Para forçar a criação das tabelas basta descomentar as duas linhas abaixo:
// const createTables = require('./utils/createTables');
// createTables();

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const productRoutes = require('./routes/product');
const cartItemRoutes = require('./routes/cartItem');
const orderRoutes = require('./routes/order');

app.use(productRoutes);
app.use(cartItemRoutes);
app.use(orderRoutes);

app.listen(3001, () => {
  console.log('Escutando em localhost:3001');
});
