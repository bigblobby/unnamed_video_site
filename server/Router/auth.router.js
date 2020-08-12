const router = require('express').Router();
const controller = require('../Controller/auth.controller');
const confirmToken = require('../Middleware/confirmToken');

router.get('/protect', confirmToken, controller.protect);

module.exports = router;
