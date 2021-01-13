import express from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';

const port = process.env.PORT || 5000;
const app = express();
config();

connectDB();

app.get('/', (req, res) => {
  res.send('Api is Running...');
});

app.use('/api/products', productRoutes);

app.listen(
  port,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`.yellow
      .bold
  )
);
