var express = require('express');
var router = express.Router();
var userController = require('../controller/usersController');

router.get('/:id', userController.getUser);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
