module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuario", {
    tipo: {
      type: Sequelize.INTEGER
    },
    nome: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    senha: {
      type: Sequelize.STRING
    }
  });

  return Usuario;
};
