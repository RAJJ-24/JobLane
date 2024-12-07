const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../models/UserModel'); // Adjust the path as needed

dotenv.config(); // Load environment variables from .env

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'Admin@12345';

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log('Admin user already exists');
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);

      const admin = new User({
        email,
        password: hashedPassword,
        role: 'admin',
      });

      await admin.save();
      console.log('Admin user created successfully');
    }

    mongoose.disconnect();
  } catch (err) {
    console.error('Error creating admin user:', err.message);
    mongoose.disconnect();
  }
};

createAdmin();
