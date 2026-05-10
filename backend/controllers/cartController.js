const Cart = require('../models/Cart');

// GET /api/cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id }).populate('items.foodId');
    if (!cart) {
      cart = { userId: req.user._id, items: [] };
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/cart/add
const addToCart = async (req, res) => {
  try {
    const { foodId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }
    const existingItem = cart.items.find(item => item.foodId.toString() === foodId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ foodId, quantity });
    }
    await cart.save();
    cart = await Cart.findOne({ userId: req.user._id }).populate('items.foodId');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/cart/update
const updateCartItem = async (req, res) => {
  try {
    const { foodId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    const item = cart.items.find(item => item.foodId.toString() === foodId);
    if (!item) return res.status(404).json({ message: 'Item not found in cart' });
    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.foodId.toString() !== foodId);
    } else {
      item.quantity = quantity;
    }
    await cart.save();
    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.foodId');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/cart/remove/:foodId
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(item => item.foodId.toString() !== req.params.foodId);
    await cart.save();
    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate('items.foodId');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/cart/clear
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user._id });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
