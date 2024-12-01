const { DataTypes, Sequelize } = require('sequelize'); 
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataCriacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, 
    },
}, {
    tableName: 'usuarios',
    timestamps: false,
});

module.exports = Usuario;
