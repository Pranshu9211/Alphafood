const User = require('../models/User');
const Order = require('../models/Order');
const Food = require('../models/Food');
const cloudinary = require('../config/cloudinary');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

const validateName = (name) => name.trim().length >= 2;
const validatePhone = (phone) => /^[0-9]{10}$/.test(phone.trim());
const validatePincode = (pincode) => /^[0-9]{6}$/.test(pincode.trim());
const validatePassword = (password) => password.length >= 6;

const normalizeAddress = (address) => ({
  label: address.label?.trim() || 'Home',
  fullName: address.fullName?.trim() || '',
  phone: address.phone?.trim() || '',
  addressLine: address.addressLine?.trim() || '',
  city: address.city?.trim() || '',
  state: address.state?.trim() || '',
  pincode: address.pincode?.trim() || '',
  isDefault: Boolean(address.isDefault)
});

const ensureSingleDefault = (addresses) => {
  let defaultSet = false;
  return addresses.map((item) => {
    if (item.isDefault && !defaultSet) {
      defaultSet = true;
      return { ...item, isDefault: true };
    }
    return { ...item, isDefault: false };
  });
};

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    if (!validateName(trimmedName)) {
      return res.status(400).json({ message: 'Please enter a valid full name' });
    }

    if (!validatePassword(trimmedPassword)) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const userExists = await User.findOne({ email: trimmedEmail });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({ name: trimmedName, email: trimmedEmail, password: trimmedPassword });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      token: generateToken(user._id)
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(401).json({ message: 'Email not registered' });
    }

    if (!(await user.matchPassword(trimmedPassword))) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const buildUserStats = (orders) => {
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const categoryCount = orders.reduce((acc, order) => {
    order.items.forEach((item) => {
      const category = item.foodId?.category || 'Other';
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {});
  const favoriteCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  return { totalOrders, totalSpent, favoriteCategory };
};

// GET /api/auth/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('favorites', 'name image price category');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const orders = await Order.find({ userId: req.user._id }).populate('items.foodId', 'category');
    const stats = buildUserStats(orders);

    res.json({ ...user.toObject(), stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, profileImage, addresses, favorites } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) {
      if (!validateName(name)) {
        return res.status(400).json({ message: 'Please enter a valid full name' });
      }
      user.name = name.trim();
    }

    if (profileImage) {
      user.profileImage = profileImage;
    }

    if (Array.isArray(addresses)) {
      const normalized = addresses.map(normalizeAddress);
      normalized.forEach((item) => {
        if (!item.fullName || !item.phone || !item.addressLine || !item.city || !item.pincode) {
          throw new Error('All address fields are required');
        }
        if (!validatePhone(item.phone)) {
          throw new Error('Phone number must be 10 digits');
        }
        if (!validatePincode(item.pincode)) {
          throw new Error('Pincode must be 6 digits');
        }
      });
      user.addresses = ensureSingleDefault(normalized);
    }

    if (Array.isArray(favorites)) {
      user.favorites = favorites.map((item) => {
        if (typeof item === 'string') return item;
        return item?._id || item;
      });
    }

    const updated = await user.save();
    const populatedUser = await User.findById(updated._id)
      .select('-password')
      .populate('favorites', 'name image price category');

    res.json(populatedUser);
  } catch (error) {
    if (error.message.includes('Phone number') || error.message.includes('Pincode') || error.message.includes('address')) {
      return res.status(400).json({ message: error.message });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No avatar file uploaded' });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).json({ message: 'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.' });
    }

    const streamUpload = (buffer) => new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'alphafoods/profiles',
          resource_type: 'image',
          transformation: [{ width: 500, height: 500, crop: 'fill', gravity: 'face' }]
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    const result = await streamUpload(req.file.buffer);
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Please fill all password fields' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const user = await User.findById(req.user._id);
    if (!user || !(await user.matchPassword(oldPassword))) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    user.password = newPassword.trim();
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAddresses = async (req, res) => {
  try {
    const { addresses } = req.body;
    if (!Array.isArray(addresses)) {
      return res.status(400).json({ message: 'Addresses must be an array' });
    }
    const normalized = addresses.map(normalizeAddress);
    normalized.forEach((address) => {
      if (!address.fullName || !address.phone || !address.addressLine || !address.city || !address.pincode) {
        throw new Error('All address fields are required');
      }
      if (!validatePhone(address.phone)) {
        throw new Error('Phone number must be 10 digits');
      }
      if (!validatePincode(address.pincode)) {
        throw new Error('Pincode must be 6 digits');
      }
    });
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.addresses = ensureSingleDefault(normalized);
    await user.save();
    res.json(user.addresses);
  } catch (error) {
    if (error.message.includes('Phone number') || error.message.includes('Pincode') || error.message.includes('address')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const { foodId } = req.params;
    const foodItem = await Food.findById(foodId);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const existingIndex = user.favorites.findIndex((id) => id.toString() === foodId);
    if (existingIndex >= 0) {
      user.favorites.splice(existingIndex, 1);
    } else {
      user.favorites.unshift(foodId);
    }
    await user.save();
    const populatedUser = await User.findById(user._id)
      .select('-password')
      .populate('favorites', 'name image price category');
    res.json(populatedUser.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  uploadAvatar,
  changePassword,
  updateAddresses,
  toggleFavorite
};
