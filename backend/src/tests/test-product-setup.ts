import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../models/product.model.js';
import { ProductType } from '../types/product.types.js';
import cloudinary from '../config/cloudinary.js';

dotenv.config();

async function runTest() {
  try {
    // 1. Test MongoDB Persistence
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB.');

    console.log('Creating a test product...');
    const testProduct = new Product({
      name: 'Test Tomato',
      description: 'Fresh organic tomatoes',
      type: ProductType.Crop,
      quantity: 100,
      price: 50,
      imageUrl: 'https://example.com/tomato.jpg',
    });

    const savedProduct = await testProduct.save();
    console.log('Schema successfully persisted in MongoDB. Product ID:', savedProduct._id);

    // Clean up
    await Product.findByIdAndDelete(savedProduct._id);
    console.log('Test product cleaned up.');

    // 2. Test Cloudinary Configuration
    console.log('\nTesting Cloudinary configuration...');
    // We upload a tiny 1x1 pixel base64 image just to test the connection and SDK
    const testBase64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

    const uploadResult = await cloudinary.uploader.upload(testBase64Image, {
      folder: 'test_uploads',
    });

    console.log('Cloudinary upload successful!');
    console.log('Secure URL:', uploadResult.secure_url);

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

runTest();
