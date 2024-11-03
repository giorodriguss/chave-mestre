const express = require('express');
const app = express();
app.use(express.json());
const sequelize = require('./config/db');
const usuariosRoutes = require('./routes/usuarios');
const senhasRoutes = require('./routes/senhas');
const plataformasRoutes = require('./routes/plataforma');

app.use('/usuarios', usuariosRoutes);
app.use('/senhas', senhasRoutes);
app.use('/plataformas', plataformasRoutes);

module.exports = app; 
