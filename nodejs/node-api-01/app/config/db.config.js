module.exports = {
  HOST: "pg",
  USER: "docker",
  PASSWORD: "docker",
  DB: "docker",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};