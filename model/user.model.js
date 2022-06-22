const Sequelize = require("sequelize");
const sequelize = require('../db/connect')
const user = sequelize.define('User',{
    id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true
    },
    password: {
        type:Sequelize.STRING,
        allowNull: false,
        minLength:3
    },
    refresh: {
        type:Sequelize.STRING
    }
})

module.exports = user