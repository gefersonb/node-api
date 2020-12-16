const db = require("../models");
const Observ = db.observs;
const Op = db.Sequelize.Op;
const Util = require("./utils");

exports.create = (req, res) => {
  let dados = req.body.data;

  if (!dados || !dados.descricao) {
    res.status(400).send({
      message: "Descricao não pode ser null"
    });
    return;
  }

  if (!dados || !dados.id_tarefa) {
    res.status(400).send({
      message: "Tarefa não pode ser null"
    });
    return;
  }

  Util.getTarefa(dados.id_tarefa).then(
    r => {
      console.log('GETTAREFA: ' + r)

      const observ = {
        id_tarefa: dados.id_tarefa,
        descricao: dados.descricao
      };

      Observ.create(observ)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Ocorreu um erro ao postar a observação."
          });
        });

    },
    e => {
      console.log('GETTAREFA: ' + e)
      res.status(400).send({
        message: e
      });
      return;
    }
  );

};
