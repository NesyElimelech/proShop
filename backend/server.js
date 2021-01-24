import express from 'express';
import path from 'path';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import _colors from 'colors';
// Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
// Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const __dirname = path.resolve();
const port = process.env.PORT || 5000;
const app = express();
config();
connectDB();

app.get('/', (_req, res) => {
  res.send('Api is Running...');
});
app.get('/api/config/paypal', (_req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(notFound);
app.use(errorHandler);

app.listen(
  port,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`.yellow
      .bold
  )
);
