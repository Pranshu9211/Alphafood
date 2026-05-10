const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Food = require('./models/Food');

const connectDB = require('./config/db');

const foodItems = [
  // Pizza
  { name: 'Margherita Pizza', price: 299, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop', category: 'Pizza', description: 'Classic pizza with fresh mozzarella, tomatoes, and basil' },
  { name: 'Pepperoni Pizza', price: 399, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', category: 'Pizza', description: 'Loaded with spicy pepperoni and melted cheese' },
  { name: 'BBQ Chicken Pizza', price: 449, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', category: 'Pizza', description: 'Smoky BBQ sauce with grilled chicken and onions' },

  // Burger
  { name: 'Classic Cheeseburger', price: 199, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', category: 'Burger', description: 'Juicy beef patty with cheddar cheese and fresh veggies' },
  { name: 'Double Smash Burger', price: 349, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop', category: 'Burger', description: 'Two smashed patties with special sauce' },
  { name: 'Chicken Burger', price: 249, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee15d?w=400&h=300&fit=crop', category: 'Burger', description: 'Crispy fried chicken with lettuce and mayo' },

  // Drinks
  { name: 'Mango Smoothie', price: 149, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop', category: 'Drinks', description: 'Fresh mango blended with yogurt and ice' },
  { name: 'Iced Coffee', price: 129, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop', category: 'Drinks', description: 'Cold brew coffee with cream and ice' },
  { name: 'Fresh Orange Juice', price: 99, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop', category: 'Drinks', description: 'Freshly squeezed orange juice' },

  // Desserts
  { name: 'Chocolate Brownie', price: 179, image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop', category: 'Desserts', description: 'Rich dark chocolate brownie with walnuts' },
  { name: 'Cheesecake', price: 249, image: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=400&h=300&fit=crop', category: 'Desserts', description: 'Creamy New York style cheesecake' },
  { name: 'Ice Cream Sundae', price: 199, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop', category: 'Desserts', description: 'Vanilla ice cream with chocolate sauce and sprinkles' },

  // Indian Food
  { name: 'Butter Chicken', price: 349, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop', category: 'Indian Food', description: 'Creamy tomato-based curry with tender chicken' },
  { name: 'Biryani', price: 299, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', category: 'Indian Food', description: 'Aromatic basmati rice with spiced meat' },
  { name: 'Paneer Tikka', price: 279, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop', category: 'Indian Food', description: 'Grilled cottage cheese with spices and peppers' },

  // Fast Food
  { name: 'French Fries', price: 99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop', category: 'Fast Food', description: 'Crispy golden fries with ketchup' },
  { name: 'Chicken Wings', price: 299, image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop', category: 'Fast Food', description: 'Spicy buffalo chicken wings' },
  { name: 'Hot Dog', price: 149, image: 'https://images.unsplash.com/photo-1612392062126-21cc36143a09?w=400&h=300&fit=crop', category: 'Fast Food', description: 'Classic hot dog with mustard and relish' },
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Food.deleteMany({});

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@alphafoods.com',
      password: 'Admin123',
      role: 'admin'
    });
    console.log('Admin user created: admin@alphafoods.com / Admin123');

    // Create test user
    await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: 'User123',
      role: 'user'
    });
    console.log('Test user created: user@test.com / User123');

    // Seed food items
    await Food.insertMany(foodItems);
    console.log(`${foodItems.length} food items seeded successfully!`);

    console.log('\n--- Seed Complete ---');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
