const cartItem = require('../models/cartItem');

exports.fetchAll = (req, res, next) => {
    cartItem.findAll()
      .then((item) => {
        if (item == null || item.length == 0) {
          res.status(204).send();
        } else {
          res.status(200).send(item);
        }
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  }

exports.findByAttrib = (req, res, next) => {
  // utilizando a req.query que já vem no formato JSON
  console.log(req.query);
  if (JSON.stringify(req.query) === "{}") {
    next();
  } else {
    cartItem.findAll({ where: req.query })
      .then((prods) => {
        if (prods == null || prods.length == 0) {
          res.status(204).send();
        } else {
          res.status(200).send(prods);
        }
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  }
}

exports.createCartItem = (req, res, next) => {
  cartItem.findOrCreate({
              where: {
                order: req.body.order, 
                product: req.body.product, 
              }, 
              defaults: {
                qty: req.body.qty
              }
    })
    .then((result) => {
      if(result[1]) {
        res.status(201).send({ "msg": "Item criado com sucesso" });
      } else {
        res.status(200).send({ "msg": `Já existe o mesmo produto cadastrado para a mesma venda`});
      }
      
    })
    .catch(err => console.log(err));
}

exports.udpateCartItem = (req, res, next) => {
  cartItem.findOne({ where: { order: req.body.order, product: req.body.product }})
    .then(item => {
      item.qty = req.body.qty;
      item.save()
        .then(result => {
          res.status(200).send({ "msg": "CartItem atualizado com sucesso"});
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      res.send({ "msg": `CartItem não encontrado` });
      console.log(err);
    });
}

exports.deleteCartItem = (req, res, next) => {
  cartItem.findOne({ where: { order: req.body.order, product: req.body.product }})
    .then(cartItem => {
      if (cartItem != null) {
        cartItem.destroy()
        .then(result => {
          res.status(200).send({"msg": "CartItem removido com sucesso"});
        })
        .catch(err => console.log(err));
      } else {
        res.status(404).send({"msg": "Não foi encontrado este item de venda"});
      }
    })
    .catch(err => console.log(err));
}