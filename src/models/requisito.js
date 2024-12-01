const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const Plataforma = require('./plataforma'); 

const Requisito = sequelize.define('Requisito', {
  idReq: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tamanhoMinSenha: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tamanhoMaxSenha: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  requerMaiusculas: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  requerMinusculas: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  requerNumeros: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  requerSimbolos: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'Requisitos', 
  timestamps: false,     
});

module.exports = Requisito;
