const router = require('express').Router();
const controller = require('../Controller/user.controller')

router.post('/signup', controller.userSignup);
router.post('/login', controller.userLogin);

module.exports = router;
