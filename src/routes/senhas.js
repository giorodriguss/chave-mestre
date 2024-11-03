const express = require('express');
const router = express.Router();
const senhasController = require('../controllers/passController');

router.post('/CreatePass', senhasController.createPassword);
router.get('/getAllPass/:idUser', senhasController.getPasswordsByUser);
router.get('/getPass/:id', senhasController.getPasswordById);
router.put('/updatePass/:id', senhasController.updatePassword);
router.delete('/delPass/:id', senhasController.deletePassword);

module.exports = router;
