module.exports = app => {
  const tarefas = require("../controllers/tarefa.controller.js");

  var router = require("express").Router();

  router.post("/", tarefas.create);

  router.get("/", tarefas.findAll);

  router.put("/", tarefas.update);

  router.delete("/", tarefas.deleteAll);

  app.use('/api/tarefas', router);
};
