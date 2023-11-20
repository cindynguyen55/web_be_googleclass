const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
/*
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  define: {
    freezeTableName: true,
  },
  ssl:true
});*/
const sequelize = new Sequelize('postgres://username:eMb5kLAT4Z3Bz7ykYqmXSzAY8wxRJkZb@dpg-cldh45eg1b2c73f7b63g-a.oregon-postgres.render.com/db_f2lf?ssl=true');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;
