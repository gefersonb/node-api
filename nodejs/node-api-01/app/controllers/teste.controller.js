const db = require("../models");
const Util = require("./utils");
const Tarefa = db.tarefas;
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  let a = await util.isAuth(req);
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

exports.tarefas = (req, res) => {
  const descricao = req.query.descricao;
  var condition = descricao ? { descricao: { [Op.like]: `%${descricao}%` } } : null;
  Tarefa.findAll({ where: condition })
    .then(data => {
      data.forEach((x) => {
        console.log(x.descricao);
      });
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao consultar Tarefas."
      });
    });
};



async function asyncForEach(array, callback, callback2) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
  callback2();
}

novoItem = (r, n, t, i, f) => {
  return {
    id_responsavel: r,
    nome: n,
    tarefas: t,
    iniciadas: i,
    finalizadas: f
  };
}
exports.indicadores = async (req, res) => {
  let tarefas = [];
  let tarefas2 = [];

  await Util.buscarTarefas(req).then(t => tarefas = t);

  asyncForEach(tarefas, async (t) => {

    let user = {};
    user.nome = "";
    await Usuario.findByPk(t.id_responsavel).then(data=>{
      if (data){
        user = {
          id: data.id,
          tipo: data.tipo,
          nome: data.nome,
          email: data.email,
        }
      }
    });
    t.nome = user.nome;
    tarefas2.push(t);
  }, () => {
    let resumo = [];
    let r = -1;
    let qTarefas = 0;
    let qIniciadas = 0;
    let qFinalizadas = 0;
    tarefas2.forEach((t, i) => {
      if (r != t.id_responsavel) {
        if (r > 0){
          let item = novoItem(r, n, qTarefas, qIniciadas, qFinalizadas);
          resumo.push(item);
        }
        r = t.id_responsavel;
        n = t.nome;
        qTarefas = 0;
        qIniciadas = 0;
        qFinalizadas = 0;
      }
      qTarefas++;
      if(t.status == 1)
        qIniciadas++;
      if(t.status == 2)
        qFinalizadas++;
    });
    if (qTarefas > 0){
      let item = novoItem(r, n, qTarefas, qIniciadas, qFinalizadas);
      resumo.push(item);
    }

    res.send(resumo);
  });


};
