import { Product } from '../models/product.model.js';
import { ProductType } from '../types/product.types.js';

export const seedProducts = async () => {
  try {
    const productCount = await Product.countDocuments();
    
    if (productCount === 0) {
      console.log('No products found. Seeding initial products...');
      
      const initialProducts = [
        {
          name: 'Fresh Organic Carrots',
          description: 'Sweet and crunchy organic carrots harvested daily from our local farm. Rich in Vitamin A and perfect for salads or snacks.',
          type: ProductType.Crop,
          quantity: 150,
          price: 45.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1612431234/carrot.jpg'
        },
        {
          name: 'Heirloom Tomatoes',
          description: 'Juicy and flavorful heirloom tomatoes in various colors. These are vine-ripened and grown without synthetic pesticides.',
          type: ProductType.Crop,
          quantity: 80,
          price: 65.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1612431234/tomato.jpg'
        },
        {
          name: 'Free-Range Eggs (Dozen)',
          description: 'Farm-fresh, free-range brown eggs. Our hens are raised with plenty of space to roam and fed a high-quality organic diet.',
          type: ProductType.Poultry,
          quantity: 50,
          price: 180.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1612431234/eggs.jpg'
        },
        {
          name: 'Whole Organic Chicken',
          description: 'Tender and flavorful whole organic chicken. Raised without antibiotics or hormones, perfect for roasting.',
          type: ProductType.Poultry,
          quantity: 25,
          price: 450.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1612431234/chicken.jpg'
        },
        {
          name: 'Fresh Spinach',
          description: 'Crisp and nutrient-dense organic spinach leaves. Great for smoothies, salads, or sautéing.',
          type: ProductType.Crop,
          quantity: 120,
          price: 35.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1612431234/spinach.jpg'
        },
        {
          name: 'Farm Fresh Milk (1L)',
          description: 'Rich and creamy farm-fresh milk, pasteurized but not homogenized to preserve its natural goodness.',
          type: ProductType.Poultry,
          quantity: 40,
          price: 95.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1612431234/milk.jpg'
        }
      ];

      await Product.insertMany(initialProducts);
      console.log('Initial products seeded successfully.');
    } else {
      console.log('Products already exist. Skipping product seed.');
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};
