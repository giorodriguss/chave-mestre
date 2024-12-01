const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db'); // Substitua com a conexão do banco
const Usuario = require('./usuario');
const Plataforma = require('./plataforma');

const Senha = sequelize.define('Senha', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    senhaGerada: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataGeracao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    idUser_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUser',
        },
    },
    codPlataforma_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Plataforma,
            key: 'codPlataforma',
        },
    },
}, {
    tableName: 'senhas',
    timestamps: false,
});

module.exports = Senha;
