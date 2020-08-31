const router = require('express').Router();
const controller = require('../Controller/user.controller')

router.post('/channel', controller.getUserChannel);

module.exports = router;
