const Sequelize = require("sequelize");
const sequelize = require('../db/connect')
const file = sequelize.define('File', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
    },
    extension: {
        type: Sequelize.STRING
    },
    mimeType: {
        type: Sequelize.STRING
    },
    size: {
        type: Sequelize.INTEGER,
    }

},{ timestamps: true,updatedAt:false })

module.exports = file