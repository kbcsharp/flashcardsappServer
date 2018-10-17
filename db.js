require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres"
});

sequelize
  .authenticate()
  .then(() => console.log("postgres flashcardsapp is connected"))
  .catch(err => console.log(err));

module.exports = sequelize;
