var express = require('express');
var router = express.Router();
var userController = require('../controller/usersController');

router.get('/', userController.getUserByEmail);
router.get('/login', userController.getLoginForm);
router.post('/login', userController.loginUser);
router.get('/register', userController.getRegisterUserForm);
router.post('/register', userController.registerUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
