import User from '../models/user.model.js';

export const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn('ADMIN_EMAIL or ADMIN_PASSWORD are not set in .env. Skipping admin seed.');
      return;
    }

    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      const admin = new User({
        firstName: 'Department of',
        lastName: 'Agriculture',
        email: adminEmail,
        password: adminPassword,
        userType: 'Admin',
      });

      await admin.save();
      console.log('Built-in DA Admin account created.');
    } else {
      console.log('Admin account already exists.');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};
