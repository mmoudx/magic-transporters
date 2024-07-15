import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import magicMoverRoutes from './routes/magicMoverRoutes';
import magicItemRoutes from './routes/magicItemRoutes';
import { errorHandler } from './middlewares/errorHandler';
import dotenv from 'dotenv';
import { swaggerUi, swaggerSpec } from './swagger';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes for Magic Movers and Magic Items
app.use(bodyParser.json());
app.use('/api', magicMoverRoutes);
app.use('/api', magicItemRoutes);

// Error handling middleware
app.use(errorHandler);


// Example route
app.get('/api', (req, res) => {
  res.send('Hello World!');
});

// MongoDB connection setup
const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017/magic-transporters';

if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}

mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

export default app;
