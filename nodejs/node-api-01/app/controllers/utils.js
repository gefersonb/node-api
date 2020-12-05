
const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;
const Tarefa = db.tarefas;

exports.isAuth = async (req) => {
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

exports.isResponsavel = async (idresp) => {
  let user;
  await Usuario.findByPk(idresp).then(data=>{
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
      message: "Responsavel inexistente.",
      erro: 2
    }
  }

  return {
    responsavel: user,
    message: "Usuário autenticado.",
    erro: 0
  }
}


exports.buscarTarefas = async (req) => {
  let descricao;
  if (req.body.query && req.body.query.descricao)
    descricao = req.body.query.descricao;


  //const descricao = req.body.query.descricao;
  condition = {};
  condition.id_responsavel = {[Op.ne]: null};
  if (descricao)
    condition.descricao = { [Op.like]: `%${descricao}%` };

    await Usuario.findByPk(1).then(u=>{
      if (u){
        user = {
          id: u.id,
          tipo: u.tipo,
          nome: u.nome,
          email: u.email,
        }
      }
    });

  let tarefas = [];

  await Tarefa.findAll({ where: condition , order: [['id_responsavel']], attributes: ['id', 'id_responsavel', 'descricao', 'inicio', 'fim', 'createdAt', 'status']})
    .then(data => {
      let r = -1;
      data.forEach((x) => {
        let y = {
          id: x.id,
          id_responsavel: x.id_responsavel,
          descricao: x.descricao,
          inicio: x.inicio,
          fim: x.fim,
          createdAt: x.createdAt,
          nome: "",
          status: x.status
        };

        tarefas.push(y);
        let user;
        if(x.id_responsavel != r) {
          r = x.id_responsavel;
        }

      });
    })
    .catch(err => {
    });

    return tarefas;


}

exports.buscarResponsavel = async (t) => {

  let user;
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
  return t;

}
