var express = require("express");
var urlController = require("../controller/urlsController");

var router = express.Router();

router.get("/:id", urlController.getUrl);
router.post("/", urlController.createUrl);
router.put("/update/:id", urlController.updateUrl);
router.delete("/:id", urlController.deleteUrl);

module.exports = router;
