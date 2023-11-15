var express = require("express");
var storeController = require("../controller/storesController");

var router = express.Router();

router.get("/", storeController.getStore);
router.post("/", storeController.createStore);
router.put("/", storeController.updateStore);
router.delete("/", storeController.deleteStore);

module.exports = router;
