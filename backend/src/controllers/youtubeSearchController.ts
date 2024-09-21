import { Request, Response } from 'express';
import axios from 'axios';

/**
 * Retrieves the searched videos on YouTube.
 *
 * This route handler fetches all videos from the YouTube search via the YouTube API.
 *
 * @function
 * @async
 * @param {Request} req - Express request object used to catch the "search" string query from the request.
 * @param {Response} res - Express response object used to send the search videos list or an error message.
 */
export const getYoutubeVideos = async (req: Request, res: Response) => {
  const search = req.query.search?.toString();

  // All YouTube credentials
  const YOUTUBE_API_KEYS = [
    process.env.YOUTUBE_API_KEY,
    process.env.YOUTUBE_API_KEY2,
    process.env.YOUTUBE_API_KEY3,
  ];

  if (!search || search.length < 3) {
    return res.status(400).json({
      message: 'Please provide a "search" query with at least 3 characters',
    });
  }

  for (const apiKey of YOUTUBE_API_KEYS) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=${apiKey}`
      );

      return res.status(200).json(response.data.items);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        // API key quota exceeded, try next key
        continue;
      } else {
        // Other errors
        return res.status(400).json({
          message: 'Error fetching YouTube search values',
          error: error.message,
        });
      }
    }
  }

  // If all API keys fail
  return res.status(403).json({
    message: 'Quota exceeded for all available API keys',
  });
};
