const Product = require('../models/product');

exports.fetchAll = (req, res, next) => {
    Product.findAll()
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

exports.findByCode = (req, res, next) => {
  console.log('passou aqui no code');
  Product.findAll({ where: { code: req.params.code } })
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

exports.findByAttrib = (req, res, next) => {
  // utilizando a req.query que já vem no formato JSON
  if (JSON.stringify(req.query) === "{}") {
    next();
  } else {
    Product.findAll({ where: req.query })
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

exports.createProduct = (req, res, next) => {
  Product.findOrCreate({
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

exports.udpateProduct = (req, res, next) => {
  Product.findOne({ where: { code: req.body.code }})
    .then(prod => {
      prod.description = req.body.description;
      prod.qty = req.body.qty;
      prod.cost = req.body.cost;
      prod.price = req.body.price;
      prod.save()
        .then(result => {
          res.status(200).send({ "msg": "Produto atualizado com sucesso"});
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      res.send({ "msg": `Produto código ${req.body.code} não encontrado` });
      console.log(err);
    });
}

exports.deleteProduct = (req, res, next) => {
  Product.findOne({ where: { code: req.body.code }})
    .then(prod => {
      if (prod != null) {
        prod.destroy()
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