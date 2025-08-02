const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register user
router.post('/register', authController.register);

// Request password reset
router.post('/request-password-reset', authController.requestPasswordReset);

// Verify email
router.get('/verify-email/:token', authController.verifyEmail);

module.exports = router;
