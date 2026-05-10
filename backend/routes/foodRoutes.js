const express = require('express');
const router = express.Router();
const { getFoods, addFood, updateFood, deleteFood } = require('../controllers/foodController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getFoods);
router.post('/', protect, adminOnly, addFood);
router.put('/:id', protect, adminOnly, updateFood);
router.delete('/:id', protect, adminOnly, deleteFood);

module.exports = router;
