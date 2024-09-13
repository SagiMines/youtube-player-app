import { Request, Response } from 'express';
import Video from '../models/Video';

/**
 * Adds a new video to the watched video history list.
 *
 * This route handler receives a video object in the request body,
 * creates a new video entry in the database, and returns the created video.
 *
 * @function
 * @async
 * @param {Request} req - Express request object containing video data in the body.
 * @param {Response} res - Express response object used to send the created video or an error message.
 */
export const addVideo = async (req: Request, res: Response) => {
  try {
    const { videoId, title, thumbnail } = req.body;
    const newVideo = new Video({ videoId, title, thumbnail });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: 'Error adding video to history' });
  }
};

/**
 * Retrieves the watched video history list.
 *
 * This route handler fetches all videos from the database and sorts them in descending order by creation.
 *
 * @function
 * @async
 * @param {Request} req - Express request object (not used in this handler).
 * @param {Response} res - Express response object used to send the video history or an error message.
 */
export const getHistory = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find().sort({ _id: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching history' });
  }
};

/**
 * Deletes a video from the watched video history list by ID.
 *
 * This route handler receives a YouTube video ID in the request parameters, deletes the corresponding video from the database,
 * and sends a confirmation message upon success.
 *
 * @function
 * @async
 * @param {Request} req - Express request object containing the YouTube video ID in the URL parameters.
 * @param {Response} res - Express response object used to send a confirmation or an error message.
 */
export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting video' });
  }
};
