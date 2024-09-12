import express from 'express';
import {
  addVideo,
  getHistory,
  deleteVideo,
} from '../controllers/videoController';

const router = express.Router();

router.post('/', addVideo);
router.get('/', getHistory);
router.delete('/:id', deleteVideo);

export default router;
