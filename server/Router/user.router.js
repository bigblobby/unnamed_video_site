const router = require('express').Router();
const controller = require('../Controller/user.controller')

router.post('/register', controller.userRegister);
router.post('/login', controller.userLogin);
router.post('/channel', controller.getUserChannel);

module.exports = router;
