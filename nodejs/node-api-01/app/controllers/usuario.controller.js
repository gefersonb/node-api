const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

isAuth = async (req) => {
  let auth = req.body.auth;
  if (!auth || !auth.usuario) {
    return {
      usuario: {},
      message: "Usuário não autenticado.",
      erro: 1
    }
  }

  let user;
  await Usuario.findByPk(auth.usuario).then(data=>{
    if (data){
      user = {
        id: data.id,
        tipo: data.tipo,
        nome: data.nome,
        email: data.email,
      }
    }
  });

  if (!user || !user.id || !user.nome) {
    return {
      usuario: {},
      message: "Usuário inexistente.",
      erro: 2
    }
  }

  return {
    usuario: user,
    message: "Usuário autenticado.",
    erro: 0
  }
}

exports.create = (req, res) => {
  let dados = req.body.data;

  if (!dados || !dados.nome) {
    res.status(400).send({
      message: "Nome não pode ser null"
    });
    return;
  }

  if (!dados.email) {
    res.status(400).send({
      message: "Email não pode ser null"
    });
    return;
  }

  if (!dados.tipo || (dados.tipo != '0' && dados.tipo != '1')) {
    res.status(400).send({
      message: "Tipo de usuário inválido."
    });
    return;
  }

  const usuario = {
    nome: dados.nome,
    email: dados.email,
    tipo: dados.tipo
  };

  Usuario.create(usuario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao criar um Usuário."
      });
    });
};

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

  Usuario.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao consultar Usuários."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Usuario.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao consultar Usuário com id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Usuario.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuário atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar o Usuário id=${id}. Usuário não encontrado ou req.body null!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar Usuário com id=" + id
      });
    });
};

exports.delete = async (req, res) => {
  let a = await isAuth(req);
  if (a.erro > 0) {
    res.status(500).send(a);
    return;
  }

  if(a.usuario.tipo == 0) {
    res.status(500).send({
      message: "Operação não permitida para o usuário.",
      erro: 10
    });
    return;
  }

  const id = req.body.data.id;

  Usuario.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuário excluído com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível excluir o Usuáiro id=${id}. Talvez ele não exista!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível excluir o Usuário com id=" + id
      });
    });
};

exports.deleteAll = async (req, res) => {

  let a = await isAuth(req);
  if (a.erro > 0) {
    res.status(500).send(a);
    return;
  }

  if(a.usuario.tipo == 0) {
    res.status(500).send({
      message: "Operação não permitida para o usuário.",
      erro: 10
    });
    return;
  }

  Usuario.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Usuários excluídos com sucesso!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao excluir os Usuários."
      });
    });
};

exports.findAllPublished = (req, res) => {
  Usuario.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao retornar os Usuários."
      });
    });
};
