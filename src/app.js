const express = require('express');
const app = express();

app.use(express.json());

// Rotas de teste
app.get('/health', (req, res) => {
  res.status(200).send('API está funcionando!');
});

app.post('/user', (req, res) => {
  res.status(201).send('usuário criado');
});

module.exports = app; 
