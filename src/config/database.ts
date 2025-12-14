import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tablas-gym';
    const dbName = process.env.NODE_ENV === 'test' ? 'gym-test' : 'gym';
    
    await mongoose.connect(mongoUri, {
      dbName: dbName
    });
    
    console.log('✅ MongoDB connected successfully');
    console.log('📂 Database:', mongoose.connection.db?.databaseName);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});
