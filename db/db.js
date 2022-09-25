const sequelize = require('sequelize');

const connection = new sequelize('qanda', 'root', 'Roccqrs#333',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;