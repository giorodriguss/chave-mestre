const sequelize = require('./config/db');
const Usuario = require('./models/Usuario');
const Senha = require('./models/Senha');
const Plataforma = require('./models/Plataforma');
const Requisito = require('./models/Requisito');

sequelize.sync({ alter: true }) // Ou { force: true } para recriar tabelas
    .then(() => console.log('Banco sincronizado'))
    .catch(err => console.error('Erro ao sincronizar', err));
