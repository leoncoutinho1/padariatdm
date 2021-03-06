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

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public'))); //liberando acesso à pasta public

// const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000, () => {
  console.log('Escutando em localhost:3000');
});
