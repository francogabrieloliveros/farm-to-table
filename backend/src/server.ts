import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect to database
connectDB()

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});


// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
