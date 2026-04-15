require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const Banner = require('../models/Banner');
const User = require('../models/User');
const products = require('./products.json');
const banners = require('./banners.json');

const seed = async () => {
  await connectDB();

  console.log('Clearing existing data...');
  await Promise.all([
    Product.deleteMany({}),
    Banner.deleteMany({}),
  ]);

  console.log('Seeding products...');
  await Product.insertMany(products);

  console.log('Seeding banners...');
  await Banner.insertMany(banners);

  // Create a default admin user if none exists
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@hms.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin1234!';
  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    await User.create({
      name: 'Admin',
      email: adminEmail,
      password: adminPassword,
      isAdmin: true,
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  console.log('Seed complete!');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
