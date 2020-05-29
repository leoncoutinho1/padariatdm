const Product = require('../api/models/product');
// const Venda = require('../models/order');

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((prods) => {
      console.log(prods);
      res.render('shop/index', {
        prods: prods
      });
    })
    .catch(err => console.log(err));
};

// exports.find = (req, res, next) => {
//   Product.find(req.params.id)
//     .then(([rows, fieldData]) => {
//       res.send(rows);
//     })
//     .catch(err => console.log(err));
// };

// exports.createVenda = (req, res, next) => {
//   console.log(req.body);
//   let venda = new Venda(req.body.vendedor, req.body.desconto, req.body.valorTotal);
//   console.log(venda);
//   res = venda.save();
//   return res;
// }