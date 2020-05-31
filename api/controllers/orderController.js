const Order = require('../models/order');

exports.fetchAll = (req, res, next) => {
    Order.findAll()
      .then((orders) => {
        if (orders == null || orders.length == 0) {
          res.status(204).send();
        } else {
          res.status(200).send(orders);
        }
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  }

// exports.findByCode = (req, res, next) => {
//   Order.findAll({ where: { code: req.params.code } })
//   .then((orders) => {
//     if (orders == null || orders.length == 0) {
//       res.status(204).send();
//     } else {
//       res.status(200).send(orders);
//     }
//   })
//   .catch((err) => {
//     res.status(404).send(err);
//   });
// }

exports.findByAttrib = (req, res, next) => {
  // utilizando a req.query que já vem no formato JSON
  if (JSON.stringify(req.query) === "{}") {
    next();
  } else {
    Order.findAll({ where: req.query })
      .then((orders) => {
        if (orders == null || orders.length == 0) {
          res.status(204).send();
        } else {
          res.status(200).send(orders);
        }
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  }
}

exports.createOrder = (req, res, next) => {
  Order.create({ 
    seller: req.body.seller,
    discount: req.body.discount,
    total: req.body.total
  })
    .then((order) => {
      res.status(201).send(order.dataValues);
    })
    .catch(err => console.log(err));
}

exports.udpateOrder = (req, res, next) => {
  Order.findOne({ where: { id: req.body.id }})
    .then(order => {
      order.seller = req.body.seller;
      order.discount = req.body.discount;
      order.total = req.body.total;
      order.save()
        .then(result => {
          res.status(200).send({ "msg": "Venda atualizada com sucesso"});
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      res.send({ "msg": `Venda ${req.body.id} não encontrada` });
      console.log(err);
    });
}

exports.deleteOrder = (req, res, next) => {
  Order.findOne({ where: { id: req.body.id }})
    .then(order => {
      if (order != null) {
        order.destroy()
        .then(result => {
          res.status(200).send({ "msg": "Venda excluída com sucesso" });
        })
        .catch(err => console.log(err));
      } else {
        res.status(404).send({ "msg": "Não foi encontrada venda com esse código" });
      }
    })
    .catch(err => console.log(err));
}