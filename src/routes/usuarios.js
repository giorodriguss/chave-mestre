const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const auth = require ('../middlewares/auth');

router.post('/login', userController.login);
router.post('/CreateUser', userController.createUser);
router.get('/getAllUsers', auth, userController.getAllUsers);  // função utilizando JWT
router.get('/getUser/:idUser', auth, userController.getUserById); 
router.put('/updateUser/:idUser', userController.updateUser); 
router.delete('/delUser/:idUser', userController.deleteUser);

/* na próxima entrega, além do que foi pedido, vou implementar 
a autenticação para os usuários só poderem alterar suas próprias informações */

module.exports = router;
