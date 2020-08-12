const router = require('express').Router();
const controller = require('../Controller/user.controller')

router.post('/user/signup', controller.userSignup);
router.post('/user/login', controller.userLogin);
router.get('/user/protect', controller.protect);

module.exports = router;
