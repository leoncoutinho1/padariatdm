const mysql = require('mysql2');

//string recebe um objeto no seguinte formato:
// {
//   host: '',
//   port: ,
//   user: '',
//   password: '',
//   database: ''
// }
const string = require('./stringConnection');

const pool = mysql.createPool(string);

module.exports = pool.promise();