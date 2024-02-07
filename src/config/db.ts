import mongoose from 'mongoose';

const connectDB = async () => {
  try { 
    const db = process.env.NODE_ENV === 'production' ? process.env.ATLAS_MONGO_URI : process.env.MONGO_URI;
    console.log('mongouri is '+db)
    const conn = await mongoose.connect(db!);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;