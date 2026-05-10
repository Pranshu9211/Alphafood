const Food = require('../models/Food');

// GET /api/food
const getFoods = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    const foods = await Food.find(query).sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/food (admin)
const addFood = async (req, res) => {
  try {
    const { name, price, image, category, description } = req.body;
    const food = await Food.create({ name, price, image, category, description });
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/food/:id (admin)
const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/food/:id (admin)
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFoods, addFood, updateFood, deleteFood };
