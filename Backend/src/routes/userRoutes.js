const express = require('express');
const { 
    getProfile, 
    updateProfile, 
    deleteProfile 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/profile')
    .get(getProfile)
    .put(updateProfile)
    .delete(deleteProfile);

module.exports = router;