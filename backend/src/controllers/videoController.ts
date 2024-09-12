import { Request, Response } from 'express';
import Video, { IVideo } from '../models/Video';

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

export const getHistory = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find().sort({ _id: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching history' });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting video' });
  }
};
