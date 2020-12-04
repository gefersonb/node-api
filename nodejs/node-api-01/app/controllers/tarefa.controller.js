const db = require("../models");
const Tarefa = db.tarefas;
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

exports.create = async (req, res) => {
  let a = await isAuth(req);
  if (a.erro > 0) {
    res.status(500).send(a);
    return;
  }

  let dados = req.body.data;
  if (!dados.descricao) {
    res.status(400).send({
      message: "Descrição não pode ser null!"
    });
    return;
  }

  const tarefa = {
    descricao: dados.descricao,
    id_responsavel: dados.id_responsavel,
    status: dados.status,
    inicio: dados.inicio,
    fim: dados.fim
  };

  Tarefa.create(tarefa)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao criar uma Tarefa."
      });
    });
};

exports.findAll = (req, res) => {
  const descricao = req.query.descricao;
  var condition = descricao ? { descricao: { [Op.like]: `%${descricao}%` } } : null;

  Tarefa.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao consultar Tarefas."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tarefa.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao consultar Usuário com id=" + id
      });
    });
};

exports.update = async (req, res) => {
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

  Tarefa.update(req.body.data, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tarefa atualizada com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar a Tarefa id=${id}. Tarefa não encontrada ou body vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar Tarefa com id=" + id + " " + err.message
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

  const id = req.params.id;

  Tarefa.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuário excluído com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possível excluir a Tarefa id=${id}. Talvez ela não exista!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível excluir o Usuário com id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Tarefa.destroy({
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
  Tarefa.findAll({ where: { published: true } })
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
