var express = require('express');
var router = express.Router();
var storeController = require('../controller/storesController');

router.get('/', storeController.getStore);
router.post('/', storeController.createStore);
router.put('/', storeController.updateStore);
router.delete('/', storeController.deleteStore);

module.exports = router;
