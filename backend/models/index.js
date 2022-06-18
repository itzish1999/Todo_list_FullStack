// Importing database setup
const dbConfig = require("../config/db.config");

// Getting contents from sequelize lib
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// a variable db that's an empty array
const db = {};

// using db with both sequelize const we created
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// having our app use the data model we use
db.todo = require('./todo.model.js')(sequelize, Sequelize);

module.exports = db;