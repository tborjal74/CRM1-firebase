const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// POST /api/login - expects { idToken }
router.post('/', loginController.login);

module.exports = router;
