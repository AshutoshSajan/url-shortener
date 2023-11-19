var express = require('express');
var router = express.Router();
var storeController = require('../controller/storesController');

router.get('/', storeController.getStores);
router.post('/', storeController.createStore);
router.put('/', storeController.updateStore);
router.delete('/', storeController.deleteStore);
router.get('/:id', storeController.getStoreById);

module.exports = router;
