const express = require('express');
const router = express.Router();
const platController = require('../controllers/platController');
const auth = require ('../middlewares/auth');

router.get('/getAllPlat', auth, platController.getAllPlatforms);
router.get('/getPlat/:codPlataforma', auth, platController.getPlatformByCode);

/* vou criar as rotas para criar plataformas com controle de acesso, de forma que só eu possa acessar */

module.exports = router;