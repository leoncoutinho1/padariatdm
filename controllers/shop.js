const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows
      });
    })
    .catch(err => console.log(err));
};

exports.find = (req, res, next) => {
  Product.find(req.params.id)
    .then(([rows, fieldData]) => {
      res.send(rows);
    })
    .catch(err => console.log(err));
};