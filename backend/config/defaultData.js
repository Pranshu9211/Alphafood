const defaultFoodItems = [
  // --- PIZZA ---
  { name: 'Margherita Bliss', price: 299, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=450&fit=crop', category: 'Pizza', description: 'Classic Italian pizza with fresh mozzarella, sun-ripened tomatoes, and organic basil.' },
  { name: 'Pepperoni Overload', price: 399, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=450&fit=crop', category: 'Pizza', description: 'Double layer of spicy pepperoni with a blend of four melted cheeses.' },
  { name: 'BBQ Smokehouse Chicken', price: 449, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=450&fit=crop', category: 'Pizza', description: 'Grilled chicken breast, red onions, and smoky BBQ sauce drizzle.' },
  { name: 'Veggie Supreme', price: 349, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&h=450&fit=crop', category: 'Pizza', description: 'Bell peppers, mushrooms, olives, onions, and sweet corn on a thin crust.' },
  { name: 'Truffle Mushroom Pizza', price: 499, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=450&fit=crop', category: 'Pizza', description: 'Exotic mushrooms infused with white truffle oil and fresh herbs.' },
  { name: 'Pesto Chicken Pizza', price: 429, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&h=450&fit=crop', category: 'Pizza', description: 'Fresh pesto base with grilled chicken, cherry tomatoes, and pine nuts.' },

  // --- BURGER ---
  { name: 'Classic Empire Burger', price: 199, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=450&fit=crop', category: 'Burger', description: 'Signature beef patty, aged cheddar, secret sauce, and garden-fresh greens.' },
  { name: 'Monster Double Smash', price: 349, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&h=450&fit=crop', category: 'Burger', description: 'Two hand-smashed patties with caramelized onions and double cheese.' },
  { name: 'Crispy Zinger Pro', price: 249, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee15d?w=600&h=450&fit=crop', category: 'Burger', description: 'Spicy fried chicken fillet with creamy slaw and pickles.' },
  { name: 'Guacamole Bacon Burger', price: 399, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=450&fit=crop', category: 'Burger', description: 'Fresh guacamole, crispy bacon, and pepper jack cheese.' },
  { name: 'BBQ Pulled Pork Burger', price: 379, image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?w=600&h=450&fit=crop', category: 'Burger', description: 'Slow-cooked pulled pork with honey BBQ sauce and crispy onions.' },
  { name: 'Vegan Quinoa Burger', price: 299, image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=600&h=450&fit=crop', category: 'Burger', description: 'Hearty quinoa and beet patty with avocado crema and sprouts.' },

  // --- DRINKS ---
  { name: 'Tropical Mango Smoothie', price: 149, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=450&fit=crop', category: 'Drinks', description: 'Fresh Alphonso mangoes blended with Greek yogurt.' },
  { name: 'Caramel Macchiato Ice', price: 129, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=450&fit=crop', category: 'Drinks', description: 'Double shot espresso with velvety caramel and chilled milk.' },
  { name: 'Sunrise Orange Juice', price: 99, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&h=450&fit=crop', category: 'Drinks', description: '100% freshly squeezed oranges with zero added sugar.' },
  { name: 'Berry Blast Lemonade', price: 119, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=450&fit=crop', category: 'Drinks', description: 'Zesty lemonade infused with fresh strawberries and mint.' },
  { name: 'Classic Oreo Shake', price: 179, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&h=450&fit=crop', category: 'Drinks', description: 'Thick vanilla shake loaded with crushed Oreo cookies.' },
  { name: 'Matcha Green Tea Latte', price: 159, image: 'https://images.unsplash.com/photo-1536496070726-401ba7583764?w=600&h=450&fit=crop', category: 'Drinks', description: 'Authentic Japanese matcha with steamed oat milk.' },

  // --- DESSERTS ---
  { name: 'Molten Lava Cake', price: 179, image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&h=450&fit=crop', category: 'Desserts', description: 'Warm chocolate cake with a gooey dark chocolate center.' },
  { name: 'NY Raspberry Cheesecake', price: 249, image: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=600&h=450&fit=crop', category: 'Desserts', description: 'Rich cheesecake with a buttery crust and fresh raspberry coulis.' },
  { name: 'Exotic Fruit Sundae', price: 199, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=450&fit=crop', category: 'Desserts', description: 'Vanilla bean ice cream with seasonal tropical fruits and nuts.' },
  { name: 'Belgian Waffle Tower', price: 229, image: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=600&h=450&fit=crop', category: 'Desserts', description: 'Fluffy waffles topped with Nutella, bananas, and whipped cream.' },
  { name: 'Tiramisu Classico', price: 279, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=450&fit=crop', category: 'Desserts', description: 'Authentic Italian tiramisu with coffee-soaked ladyfingers.' },
  { name: 'Red Velvet Pastry', price: 159, image: 'https://images.unsplash.com/photo-1616031037011-087000171abe?w=600&h=450&fit=crop', category: 'Desserts', description: 'Velvety red sponge with smooth cream cheese frosting.' },

  // --- INDIAN FOOD ---
  { name: 'Royal Butter Chicken', price: 349, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=450&fit=crop', category: 'Indian Food', description: 'Tender chicken in a rich, buttery tomato gravy with dried fenugreek.' },
  { name: 'Hyderabadi Dum Biryani', price: 299, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=450&fit=crop', category: 'Indian Food', description: 'Aromatic long-grain basmati rice cooked with saffron and spiced meat.' },
  { name: 'Paneer Tikka Masala', price: 279, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&h=450&fit=crop', category: 'Indian Food', description: 'Grilled paneer cubes in a spicy, onion-tomato based gravy.' },
  { name: 'Dal Makhani Heritage', price: 249, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=450&fit=crop', category: 'Indian Food', description: 'Black lentils slow-cooked overnight with butter and cream.' },
  { name: 'Mutton Rogan Josh', price: 449, image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&h=450&fit=crop', category: 'Indian Food', description: 'Kashmiri style mutton curry with aromatic spices and yogurt.' },
  { name: 'Stuffed Garlic Naan', price: 79, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=450&fit=crop', category: 'Indian Food', description: 'Clay oven-baked bread with garlic, herbs, and butter.' },

  // --- FAST FOOD ---
  { name: 'Crispy Golden Fries', price: 99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=450&fit=crop', category: 'Fast Food', description: 'Premium cut potatoes fried to golden perfection with sea salt.' },
  { name: 'Buffalo Fire Wings', price: 299, image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&h=450&fit=crop', category: 'Fast Food', description: 'Spicy chicken wings tossed in signature buffalo hot sauce.' },
  { name: 'Classic Hot Dog XL', price: 149, image: 'https://images.unsplash.com/photo-1612392062126-21cc36143a09?w=600&h=450&fit=crop', category: 'Fast Food', description: 'Gourmet sausage with caramelized onions, mustard, and relish.' },
  { name: 'Chicken Popcorn Bucket', price: 219, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&h=450&fit=crop', category: 'Fast Food', description: 'Bite-sized crispy chicken pieces served with garlic mayo.' },
  { name: 'Cheesy Nachos Loaded', price: 189, image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&h=450&fit=crop', category: 'Fast Food', description: 'Tortilla chips with liquid cheese, jalapeños, and salsa.' },
  { name: 'Chicken Shawarma Wrap', price: 169, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=450&fit=crop', category: 'Fast Food', description: 'Middle-eastern style chicken wrap with tahini and pickles.' },
];

module.exports = defaultFoodItems;
