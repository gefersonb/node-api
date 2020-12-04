module.exports = (sequelize, Sequelize) => {
  const Tarefa = sequelize.define("tarefa", {
    id_responsavel: {
      type: Sequelize.INTEGER
    },
    descricao: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER
    },
    inicio: {
      type: Sequelize.DATE
    },
    fim: {
      type: Sequelize.DATE
    }
  });

  return Tarefa;
};
