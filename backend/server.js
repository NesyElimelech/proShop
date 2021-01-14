import express from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import _colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;
const app = express();
config();
connectDB();

app.get('/', (_req, res) => {
  res.send('Api is Running...');
});

app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(
  port,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`.yellow
      .bold
  )
);
