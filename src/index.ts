import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import customerRoutes from './routes/customerRoutes';
import productRoutes from './routes/productRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Global Error Handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
