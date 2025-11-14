const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');

// Placeholder routes - to be implemented
router.get('/', protect, restrictTo('student', 'teacher'), async (req, res) => {
  res.json({ success: true, message: 'Students endpoint' });
});

module.exports = router;
