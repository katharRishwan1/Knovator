const authenticateJwt = require('../config/authendicate');
const { post } = require('../controller');

const router = require('express').Router();

router.post('/post',authenticateJwt,post.post);
router.get('/post/:id?',authenticateJwt,post.get);
router.put('/post/:id',authenticateJwt,post.update);
router.delete('/post/:id',authenticateJwt,post.delete);
router.get('/dashboard', authenticateJwt,post.dashboard)

module.exports = router;