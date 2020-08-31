const router = require('express').Router();
const controller = require('../Controller/post.controller');
const confirmToken = require('../Middleware/confirmToken');

router.post('/create', confirmToken, controller.create);
router.get('/all', controller.all);

module.exports = router;
