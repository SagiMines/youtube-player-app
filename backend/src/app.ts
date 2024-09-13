/**
 * This is the main server file for the Express application.
 *
 * It sets up an Express server, connects to a MongoDB database using Mongoose,
 * and sets up API routes for handling the YouTube videos requests.
 *
 * The server uses CORS for cross-origin requests and dotenv for environment configuration.
 */

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import videoRoutes from './routes/videoRoutes';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/**
 * Connect to MongoDB using Mongoose.
 * The MongoDB connection URI is stored in the environment variable `MONGODB_URI`.
 * If the connection is successful, a confirmation message is logged.
 * If the connection fails, the error is logged.
 */
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

/**
 * Define API routes for videos operations.
 * Routes are prefixed with `/api/videos` and handled by `videoRoutes`.
 */
app.use('/api/videos', videoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
