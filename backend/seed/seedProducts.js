import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedProducts = [
  // Electronics
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    stock: 50
  },
  {
    name: 'USB-C Cable',
    description: 'Durable USB-C charging cable with fast charging support.',
    price: 19.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    stock: 200
  },
  {
    name: 'Portable Power Bank',
    description: '20000mAh portable power bank with dual charging ports.',
    price: 49.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    stock: 75
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with 2.4GHz connection.',
    price: 29.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    stock: 100
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with cherry mx switches.',
    price: 129.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829191301-41e580aa14de?w=500&h=500&fit=crop',
    stock: 40
  },
  {
    name: 'USB Hub',
    description: '7-port USB 3.0 hub with fast charging support.',
    price: 39.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    stock: 80
  },
  {
    name: 'Monitor Stand',
    description: 'Adjustable monitor stand with storage compartment.',
    price: 59.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    stock: 60
  },
  {
    name: 'Webcam HD',
    description: '1080p HD webcam with auto-focus and built-in microphone.',
    price: 79.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1598986646514-94b6a4b55e65?w=500&h=500&fit=crop',
    stock: 45
  },
  {
    name: 'HDMI Cable',
    description: '4K HDMI 2.1 cable with high-speed data transfer.',
    price: 14.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    stock: 150
  },
  {
    name: 'Phone Stand',
    description: 'Adjustable phone stand for desk with stable base.',
    price: 9.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1602524206684-88c5dbe5d9d6?w=500&h=500&fit=crop',
    stock: 120
  },

  // Clothing
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt available in multiple colors.',
    price: 24.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    stock: 200
  },
  {
    name: 'Jeans',
    description: 'Classic blue denim jeans with comfortable fit.',
    price: 59.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
    stock: 150
  },
  {
    name: 'Hoodie',
    description: 'Warm and cozy hoodie perfect for cool weather.',
    price: 49.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=500&h=500&fit=crop',
    stock: 100
  },
  {
    name: 'Polo Shirt',
    description: 'Classic polo shirt with embroidered logo.',
    price: 34.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1522069213448-443a614da9b6?w=500&h=500&fit=crop',
    stock: 120
  },
  {
    name: 'Sports Shorts',
    description: 'Breathable sports shorts with moisture-wicking technology.',
    price: 29.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1612822260123-4a2d4e3b5b1e?w=500&h=500&fit=crop',
    stock: 110
  },
  {
    name: 'Winter Jacket',
    description: 'Waterproof winter jacket with thermal lining.',
    price: 129.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1539533057440-7a601e1e1d51?w=500&h=500&fit=crop',
    stock: 60
  },
  {
    name: 'Cardigan',
    description: 'Soft cardigan sweater perfect for layering.',
    price: 44.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1530268729831-4be0ea256968?w=500&h=500&fit=crop',
    stock: 80
  },
  {
    name: 'Formal Pants',
    description: 'Professional formal pants for business wear.',
    price: 74.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1473621038790-b3aca92f3dad?w=500&h=500&fit=crop',
    stock: 70
  },

  // Books
  {
    name: 'JavaScript Guide',
    description: 'Complete guide to JavaScript programming for beginners and advanced users.',
    price: 39.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e3ffe02?w=500&h=500&fit=crop',
    stock: 100
  },
  {
    name: 'Web Development Basics',
    description: 'Learn HTML, CSS, and JavaScript from scratch.',
    price: 34.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500&h=500&fit=crop',
    stock: 90
  },
  {
    name: 'Database Design Handbook',
    description: 'Master database design patterns and best practices.',
    price: 49.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=500&fit=crop',
    stock: 60
  },
  {
    name: 'Python Cookbook',
    description: 'Practical Python recipes and solutions.',
    price: 29.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1543002588-d83cedbc4d45?w=500&h=500&fit=crop',
    stock: 75
  },
  {
    name: 'API Design Best Practices',
    description: 'Build scalable and maintainable APIs.',
    price: 44.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500&h=500&fit=crop',
    stock: 55
  },
  {
    name: 'System Design Interview',
    description: 'Prepare for system design interviews with practical examples.',
    price: 54.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500&h=500&fit=crop',
    stock: 45
  },

  // Home
  {
    name: 'Table Lamp',
    description: 'Modern LED table lamp with dimming feature.',
    price: 39.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1565636192335-14a15f881f10?w=500&h=500&fit=crop',
    stock: 80
  },
  {
    name: 'Desk Organizer',
    description: 'Multi-compartment desk organizer for office supplies.',
    price: 24.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1554995207-c18e38dd9cc9?w=500&h=500&fit=crop',
    stock: 150
  },
  {
    name: 'Coffee Maker',
    description: 'Automatic coffee maker with 12-cup capacity.',
    price: 69.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=500&h=500&fit=crop',
    stock: 50
  },
  {
    name: 'Bath Towel Set',
    description: 'Soft and absorbent bath towel set of 4.',
    price: 34.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1584622181039-2bab2328369a?w=500&h=500&fit=crop',
    stock: 100
  },
  {
    name: 'Wall Clock',
    description: 'Modern minimalist wall clock with silent movement.',
    price: 29.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1e?w=500&h=500&fit=crop',
    stock: 70
  },
  {
    name: 'Throw Pillow',
    description: 'Comfortable throw pillow with removable cover.',
    price: 19.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
    stock: 120
  },

  // Sports
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with carrying strap.',
    price: 29.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1552456199-dff8433fdc10?w=500&h=500&fit=crop',
    stock: 100
  },
  {
    name: 'Dumbbells Set',
    description: 'Adjustable dumbbells set with 5 weight options.',
    price: 89.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1582918883562-40cb08c45caa?w=500&h=500&fit=crop',
    stock: 40
  },
  {
    name: 'Running Shoes',
    description: 'Professional running shoes with cushioned soles.',
    price: 109.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    stock: 60
  },
  {
    name: 'Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours.',
    price: 34.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e9?w=500&h=500&fit=crop',
    stock: 150
  },
  {
    name: 'Resistance Bands',
    description: 'Set of 5 resistance bands for home workouts.',
    price: 19.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&h=500&fit=crop',
    stock: 120
  },

  // Toys
  {
    name: 'LEGO Set',
    description: 'LEGO building set with 1000+ pieces.',
    price: 79.99,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=500&h=500&fit=crop',
    stock: 60
  },
  {
    name: 'Action Figure',
    description: 'Collectible action figure with articulated joints.',
    price: 24.99,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=500&h=500&fit=crop',
    stock: 100
  },
  {
    name: 'Puzzle Game',
    description: '3D puzzle game with 500 pieces.',
    price: 19.99,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1612308309202-9c97a78c78b2?w=500&h=500&fit=crop',
    stock: 80
  },

  // Beauty
  {
    name: 'Face Cleanser',
    description: 'Gentle face cleanser for all skin types.',
    price: 14.99,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop',
    stock: 150
  },
  {
    name: 'Moisturizer Cream',
    description: 'Hydrating moisturizer with natural ingredients.',
    price: 24.99,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop',
    stock: 120
  },
  {
    name: 'Lipstick Set',
    description: 'Set of 5 lipsticks in assorted shades.',
    price: 29.99,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1599780822e59fb8f7f6f9f7e8f5f5f5?w=500&h=500&fit=crop',
    stock: 100
  },

  // Food
  {
    name: 'Organic Tea',
    description: 'Premium organic tea collection with 50 tea bags.',
    price: 19.99,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1597318241569-f9d5f5c0bef1?w=500&h=500&fit=crop',
    stock: 200
  },
  {
    name: 'Dark Chocolate',
    description: 'Premium 70% dark chocolate bar.',
    price: 9.99,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd37b1b?w=500&h=500&fit=crop',
    stock: 250
  },
  {
    name: 'Coffee Beans',
    description: 'Freshly roasted coffee beans - 1kg bag.',
    price: 34.99,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b8f4?w=500&h=500&fit=crop',
    stock: 100
  },
  {
    name: 'Almond Butter',
    description: 'Natural almond butter with no added sugar.',
    price: 14.99,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd37b1b?w=500&h=500&fit=crop',
    stock: 80
  }
];

async function seedDB() {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // Insert new products
    await Product.insertMany(seedProducts);
    console.log(`${seedProducts.length} products seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDB();