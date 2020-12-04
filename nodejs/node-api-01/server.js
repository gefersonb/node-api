const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
app.get("/", (req, res) => {
  res.json({ message: "DESAFIO TÉCNICO Desenvolvedor(a) Full Stack Pleno - Home Office - Geferson Buzzello" });
});

require("./app/routes/usuario.routes")(app);

require("./app/routes/tarefa.routes")(app);

require("./app/routes/teste.routes")(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
