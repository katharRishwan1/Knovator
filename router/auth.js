const { auth } = require('../controller');

const router = require('express').Router();

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;