const express = require('express');
const { upload } = require('../../utils/cloudinary');
const {
    register,
    login,
    updateOnboarding,
    getMe,
    uploadMedia
} = require('./vendorController');

const router = express.Router();

const { protectVendor } = require('../../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protectVendor, getMe);
router.post('/upload', protectVendor, upload.single('file'), uploadMedia);
router.put('/onboarding/:step', protectVendor, updateOnboarding);

module.exports = router;
