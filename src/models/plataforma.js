const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const Requisito = require('./requisito'); // Importando o modelo Requisito

const Plataforma = sequelize.define('Plataforma', {
    codPlataforma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idReq_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Requisito, // Referência ao modelo Requisitos
            key: 'idReq',
        },
        onUpdate: 'CASCADE', // Atualiza automaticamente a FK se o ID mudar
        onDelete: 'CASCADE', // Exclui as plataformas associadas ao deletar um requisito
    },
}, {
    tableName: 'plataforma',
    timestamps: false,
});

module.exports = Plataforma; 