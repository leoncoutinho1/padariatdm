const User = require('../models/user');

exports.fetchAll = (req, res, next) => {
  User.findAll()
    .then(users => {
      if (users == null || users.length == 0) {
        res.status(204).send();
      } else {
        res.status(200).send(users);
      }
    })
    .catch(err => {
      res.status(404).send(err);
    }); 
}

exports.findById = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(404).send(err);
    });
}


exports.findByAttrib = (req, res, next) => {
  if (JSON.stringify(req.query) === "{}") {
    next();
  } else {
    User.findAll()
    .then(users => {
      if (users == null || users.length == 0) {
        res.status(204).send();
      } else {
        res.status(200).send(users);
      }
    })
    .catch(err => {
      res.status(404).send(err);
    });
  }  
}

exports.createUser = (req, res, next) => {
  User.findOrCreate({ 
      where: { name: req.body.name }
    })
    .then(result => {
      if (result[1]) {
        res.status(201).send(result[0]);
      } else {
        res.status(200).send({"msg": `O usuário já existe com o id: ${result[0].id}`});
      }
    })
    .catch(err => {
      res.status(404).send();
    })
}

exports.updateUser = (req, res, next) => {
  User.findOne({ where: { id: req.body.id } })
    .then(user => {
      user.name = req.body.name;
      return user.save()
    })
    .then(result => {
      res.status(200).send({ "msg": "Usuário atualizado com sucesso"});
    })
    .catch(err => {
      res.send({ "msg": `Usuário não encontrado` });
    });
}

exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.body.id }})
    .then(user => {
      return user.destroy()
    })
    .then(result => {
      res.status(200).send({"msg": "Usuário removido com sucesso"});
    })
    .catch(err => {
      res.status(404).send({"msg": "Não foi encontrado este item de venda"});
    });
};