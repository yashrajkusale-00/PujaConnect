const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// USER dashboard
router.get('/user', auth(['user']), (req, res) => {
  res.json({
    message: 'User dashboard data',
    user: req.user
  });
});

// PANDIT dashboard
router.get('/pandit', auth(['pandit']), (req, res) => {
  res.json({
    message: 'Pandit dashboard data',
    user: req.user
  });
});

// ADMIN dashboard
router.get('/admin', auth(['admin']), (req, res) => {
  res.json({
    message: 'Admin dashboard data',
    user: req.user
  });
});

module.exports = router;
