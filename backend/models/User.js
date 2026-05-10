const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Basic email regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  profileImage: {
    type: String,
    default: ''
  },
  addresses: [{
    label: {
      type: String,
      default: 'Home',
      trim: true
    },
    fullName: {
      type: String,
      required: [true, 'Please add a name for the address'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      validate: {
        validator: function(v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: 'Phone number must be 10 digits'
      }
    },
    addressLine: {
      type: String,
      required: [true, 'Please add an address line'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Please add a city'],
      trim: true
    },
    state: {
      type: String,
      trim: true,
      default: ''
    },
    pincode: {
      type: String,
      required: [true, 'Please add a pincode'],
      validate: {
        validator: function(v) {
          return /^[0-9]{6}$/.test(v);
        },
        message: 'Pincode must be 6 digits'
      }
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
