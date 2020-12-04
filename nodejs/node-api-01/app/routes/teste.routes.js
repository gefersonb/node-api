module.exports = app => {
  const testes = require("../controllers/teste.controller.js");

  var router = require("express").Router();

  router.get("/tarefas", testes.tarefas);

  router.post("/indicadores", testes.indicadores);

  router.post("/", testes.create);

  app.use('/api/testes', router);
};
