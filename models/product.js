const db = require('../utils/database');

module.exports = class Product {
  constructor(id, code, description) {
    this.id = id;
    this.code = code;
    this.description = description;
  }

  static fetchAll() {
    return db.execute('select * from produtos');
  }

  static find(prod) {
    return db.execute(`select * from produtos where code = '${prod}' or description like '%${prod}%'`);
  }
}