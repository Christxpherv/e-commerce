import mongoose from 'mongoose';
import dotenv from 'dotenv';
import data from './data.js'; // Adjust the path as necessary
import Product from './models/productModel.js'; // Adjust the path as necessary

dotenv.config();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/shopify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const seedProducts = async () => {
  try {
    await Product.deleteMany(); // Clear existing data
    const createdProducts = await Product.insertMany(data.products); // Insert new data
    console.log('Data imported successfully');
    process.exit(); // Exit the script
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1); // Exit with error
  }
};

seedProducts();

/* 
Steps to seed data into the DB incase I forget

1. In the terminal, make sure % mongod --dbpath ~/mongodb-data/db is running
2. After that use, % mongosh command to open the DB shell 
3. Write % use <DBname>
4. In another terminal, run the % node seedDB.js command
*/
