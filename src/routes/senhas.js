const express = require('express');
const router = express.Router();
const passController = require('../controllers/passController');

router.post('/CreatePass', passController.createPassword);
router.post('/storePassword', passController.storePassword);
router.get('/getAllPass/:idUser', passController.getPasswordsByUser);
router.get('/getPassByPlat/:codPlataforma', passController.getPasswordsByPlatform);
router.get('/getPass/:id', passController.getPasswordById);
router.put('/updatePass/:id', passController.updatePassword);
router.delete('/delPass/:id', passController.deletePassword);

/* na próxima entrega, além do que foi pedido, vou implementar a autenticação para os usuários só poderem ver/alterar as senhas correspondentes a eles */


module.exports = router;
