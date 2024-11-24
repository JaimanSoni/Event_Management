const express = require('express');
const { registerUser, loginUser, updateProfile } = require('../controllers/authController');
const authenticateUser = require('../middleware/authMiddleware');
const upload = require('../config/multer');
const router = express.Router();
router.post('/register', registerUser); // Register route
router.post('/login', loginUser); // Login route
router.put('/update-profile', authenticateUser, upload.single('profilePhoto'), updateProfile);

module.exports = router;
