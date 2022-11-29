const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
// router.get('/getme', controller);
// router.post('/login', controller);

module.exports = router;