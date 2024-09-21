/**
 * Express router for handling search on YouTube.
 *
 * Routes:
 * - GET /: Retrieve the search videos.
 */

import express from 'express';
import { getYoutubeVideos } from '../controllers/youtubeSearchController';

const router = express.Router();

/**
 * GET /api/youtube-search
 *
 * Route to retrieve the youtube searched videos list.
 */
router.get('/', getYoutubeVideos);

export default router;
