module.exports = app => {
  const observs = require("../controllers/observ.controller.js");

  var router = require("express").Router();

  router.post("/", observs.create);
/*
  router.get("/", observs.findAll);

  router.put("/", observs.update);
  */

  app.use('/api/observs', router);
};
