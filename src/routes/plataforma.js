const express = require('express');
const router = express.Router();
const plataformasController = require('../controllers/platController');

router.get('/getAllPlat', plataformasController.getAllPlatforms);
router.get('/getPlat/:codPlataforma', plataformasController.getPlatformByCode);

/* funções de criar/atualizar plataformas serão feitas manualmente dentro do código, 
por exigirem uma nova lógica de geração de senhas com base nos requisitos de cada uma */

module.exports = router;