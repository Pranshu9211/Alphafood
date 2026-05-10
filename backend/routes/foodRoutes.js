const express = require('express');
const multer = require('multer');
const router = express.Router();
const { getFoods, addFood, updateFood, deleteFood, uploadFoodImage } = require('../controllers/foodController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', getFoods);
router.get('/force-seed', forceSeed); // Secret route to seed live DB
router.post('/', protect, adminOnly, addFood);
router.post('/upload', protect, adminOnly, upload.single('image'), uploadFoodImage);
router.put('/:id', protect, adminOnly, updateFood);
router.delete('/:id', protect, adminOnly, deleteFood);

module.exports = router;
