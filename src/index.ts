import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import categoryRoutes from './routes/category.routes';
import exerciseRoutes from './routes/exercise.routes';
import tableRoutes from './routes/table.routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Tablas Gym API - Server is running' });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/tables', tableRoutes);

// Database connection and server start
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
