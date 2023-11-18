var express = require('express');
var router = express.Router();
var urlController = require('../controller/urlsController');

// router.get('/:id', urlController.getUrl);
router.get('/:slug', urlController.getUrlBySlug);
router.post('/', urlController.createUrl);
router.put('/update/:id', urlController.updateUrl);
router.delete('/:id', urlController.deleteUrl);

module.exports = router;
