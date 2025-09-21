const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');

// Logout route (for frontend, just remove token client-side)
router.post('/', authenticate, (req, res) => {
  // No server-side session to destroy for Firebase Auth
  // Just respond with success; frontend should remove token
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
