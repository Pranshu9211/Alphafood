const mongoose = require('mongoose');
const User = require('./models/User');
const Food = require('./models/Food');
const connectDB = require('./config/db');
const defaultFoodItems = require('./config/defaultData');

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Food.deleteMany({});

    // Create admin user
    await User.create({
      name: 'Admin',
      email: 'admin@alphafoods.com',
      password: 'Admin123',
      role: 'admin'
    });
    console.log('✓ Admin user created: admin@alphafoods.com / Admin123');

    // Create test user
    await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: 'User123',
      role: 'user'
    });
    console.log('✓ Test user created: user@test.com / User123');

    // Seed food items
    await Food.insertMany(defaultFoodItems);
    console.log(`✓ ${defaultFoodItems.length} food items seeded successfully!`);

    console.log('\n--- Seed Complete ---');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
