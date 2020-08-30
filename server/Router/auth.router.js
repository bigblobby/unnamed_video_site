const router = require('express').Router();
const controller = require('../Controller/auth.controller');
const confirmToken = require('../Middleware/confirmToken');

router.post('/protect', confirmToken, controller.protect);

module.exports = router;
