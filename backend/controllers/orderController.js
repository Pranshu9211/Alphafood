const Order = require('../models/Order');
const Cart = require('../models/Cart');

// POST /api/orders
const placeOrder = async (req, res) => {
  try {
    const { deliveryAddress, paymentMethod } = req.body;

    // Validate address
    if (!deliveryAddress || !deliveryAddress.fullName || !deliveryAddress.phone ||
        !deliveryAddress.addressLine || !deliveryAddress.city || !deliveryAddress.pincode) {
      return res.status(400).json({ message: 'All address fields are required' });
    }

    // Validate phone
    if (!/^[0-9]{10}$/.test(deliveryAddress.phone)) {
      return res.status(400).json({ message: 'Phone number must be 10 digits' });
    }

    // Validate pincode
    if (!/^[0-9]{6}$/.test(deliveryAddress.pincode)) {
      return res.status(400).json({ message: 'Pincode must be 6 digits' });
    }

    // Only COD is allowed
    if (paymentMethod && paymentMethod !== 'COD') {
      return res.status(400).json({ message: 'Online payment is currently not available' });
    }

    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.foodId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      foodId: item.foodId._id,
      name: item.foodId.name,
      price: item.foodId.price,
      image: item.foodId.image,
      quantity: item.quantity
    }));

    const totalPrice = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      totalPrice,
      deliveryAddress,
      paymentMethod: 'COD',
      status: 'Pending'
    });

    // Clear cart after order
    await Cart.findOneAndDelete({ userId: req.user._id });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/orders/:id
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { placeOrder, getUserOrders, getAllOrders, updateOrderStatus };
