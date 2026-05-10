const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  uploadAvatar,
  changePassword,
  updateAddresses,
  toggleFavorite
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/profile/avatar', protect, upload.single('avatar'), uploadAvatar);
router.put('/profile/password', protect, changePassword);
router.put('/profile/addresses', protect, updateAddresses);
router.put('/profile/favorites/:foodId', protect, toggleFavorite);

module.exports = router;
