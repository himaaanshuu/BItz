import mongoose from 'mongoose';

const connectDB = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri, {
    autoIndex: true,
  });

  return mongoose.connection;
};

export default connectDB;
