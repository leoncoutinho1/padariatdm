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

exports.findByCode = (req, res, next) => {
  console.log('passou aqui no code');
  Order.findAll({ where: { code: req.params.code } })
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
  Order.findOrCreate({
              where: { 
                code: req.body.code 
              }, 
              defaults: {
                description: req.body.description,
                qty: req.body.qty,
                cost: req.body.cost,
                price: req.body.price
              }
    })
    .then((result) => {
      if(result[1]) {
        res.status(201).send({ "msg": "Objeto criado com sucesso" });
      } else {
        res.status(200).send({ "msg": `Já existe o produto cadastrado com o nome: ${result[0].description}`});
      }
      
    })
    .catch(err => console.log(err));
}

exports.udpateOrder = (req, res, next) => {
  Order.findOne({ where: { code: req.body.code }})
    .then(order => {
      order.description = req.body.description;
      order.qty = req.body.qty;
      order.cost = req.body.cost;
      order.price = req.body.price;
      order.save()
        .then(result => {
          res.status(200).send({ "msg": "orderuto atualizado com sucesso"});
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      res.send({ "msg": `Produto código ${req.body.code} não encontrado` });
      console.log(err);
    });
}

exports.deleteOrder = (req, res, next) => {
  Order.findOne({ where: { code: req.body.code }})
    .then(order => {
      if (order != null) {
        order.destroy()
        .then(result => {
          res.status(200).send({ "msg": "Produto removido com sucesso" });
        })
        .catch(err => console.log(err));
      } else {
        res.status(404).send({ "msg": "Não foi encontrado produto com esse código" });
      }
    })
    .catch(err => console.log(err));
}