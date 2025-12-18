import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const MONGODB_PASSWORD = "MlpvMklONkFXeTcwZUlSYw==";

  try {
    const password = MONGODB_PASSWORD 
      ? Buffer.from(MONGODB_PASSWORD, 'base64').toString('utf-8')
      : '';
    const mongoUri = process.env.MONGODB_URI_BASE?.replace('%pass%', password); // || 'mongodb://localhost:27017';
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
