/**
 * Express router for handling videos routes.
 *
 * Routes:
 * - POST /: Add a new video to the watched videos history.
 * - GET /: Retrieve the wtached video history.
 * - DELETE /:id: Delete a specific video from the video history list by its ID.
 *
 * Each route is associated with a corresponding controller function in `videoController`.
 */

import express from 'express';
import {
  addVideo,
  getHistory,
  deleteVideo,
} from '../controllers/videoController';

const router = express.Router();

/**
 * POST /api/videos
 *
 * Route to add a new video to the watched videos history list.
 */
router.post('/', addVideo);

/**
 * GET /api/videos
 *
 * Route to retrieve the watched video history list.
 */
router.get('/', getHistory);

/**
 * DELETE /api/videos/:id
 *
 * Route to delete a specific video from the watched videos history list by its ID.
 */
router.delete('/:id', deleteVideo);

export default router;
