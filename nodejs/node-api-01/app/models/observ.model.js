module.exports = (sequelize, Sequelize) => {
  const Observacao = sequelize.define("observ", {
    id_tarefa: {
      type: Sequelize.INTEGER
    },
    descricao: {
      type: Sequelize.STRING
    }
  });

  return Observacao;
};
