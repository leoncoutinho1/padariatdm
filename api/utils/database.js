// const mysql = require('mysql2');

// formato da string de conexão para MySQL puro
// {
//   host: '',
//   port: ,
//   user: '',
//   password: '',
//   database: ''
// }

// Formato da string de conexão para o Sequelize
// 'dialect://user:password@server.com:port/database'

const stringConn = require('./stringConnection');

// Conexão utilizando MySQL puro

// const pool = mysql.createPool(stringConn);

// module.exports = pool.promise();

// Conexão utilizando Sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize(stringConn);

module.exports = sequelize;

