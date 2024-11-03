const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/userController');

router.post('/CreateUser', usuariosController.createUser);
router.get('/getAllUsers', usuariosController.getAllUsers);
router.get('/getUser/:idUser', usuariosController.getUserById);
router.put('/updateUser/:idUser', usuariosController.updateUser);
router.delete('/delUser/:idUser', usuariosController.deleteUser);

module.exports = router;