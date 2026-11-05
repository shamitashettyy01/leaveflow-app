const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/user');

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = 'admin@leaveflow.com';
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log('Admin account already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    await User.create({
      name: 'LeaveFlow Admin',
      email,
      password: hashedPassword,
      role: 'admin',
      leaveBalance: 24
    });

    console.log('Admin account created successfully!');
  } catch (error) {
    console.log(error.message);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();