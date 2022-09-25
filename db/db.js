const sequelize = require('sequelize');

const connection = new sequelize('qanda', 'user', 'pwd',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
