import axios from 'axios';
import { Video, YoutubeSearchResult } from '../types';
import { ChangeEvent } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_KEY2 = import.meta.env.VITE_YOUTUBE_API_KEY2;

export const fetchHistory = async (
  setHistory: React.Dispatch<React.SetStateAction<Video[]>>
): Promise<void> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/videos`);

    setHistory([...response.data]);
  } catch (error) {
    console.error('Error fetching history:', error);
  }
};

export const handleSearch = async (
  searchQuery: string,
  setSearchResults: React.Dispatch<React.SetStateAction<YoutubeSearchResult[]>>
): Promise<void> => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${YOUTUBE_API_KEY}`
    );
    setSearchResults(response.data.items);
  } catch (error: any) {
    if (error.status === 403) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${YOUTUBE_API_KEY2}`
        );
        setSearchResults(response.data.items);
      } catch (error: any) {
        console.error('Error searching videos:', error);
      }
    } else {
      console.error('Error searching videos:', error);
    }
  }
};

export const handlePlay = async (
  video: YoutubeSearchResult,
  setCurrentVideo: React.Dispatch<React.SetStateAction<string>>,
  setHistory: React.Dispatch<React.SetStateAction<Video[]>>,
  setSearchResults: React.Dispatch<React.SetStateAction<YoutubeSearchResult[]>>
): Promise<void> => {
  setCurrentVideo(video.id.videoId);
  try {
    await axios.post(`${API_BASE_URL}/videos`, {
      videoId: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.default.url,
    });
    fetchHistory(setHistory);
    setSearchResults([]);
  } catch (error) {
    console.error('Error adding video to history:', error);
  }
};

export const handleHistoryPlay = async (
  videoId: string,
  searchResults: YoutubeSearchResult[],
  setCurrentVideo: React.Dispatch<React.SetStateAction<string>>,
  setSearchResults: React.Dispatch<React.SetStateAction<YoutubeSearchResult[]>>
): Promise<void> => {
  setCurrentVideo(videoId);
  if (searchResults.length) setSearchResults([]);
};

export const handleDelete = async (
  id: string,
  setHistory: React.Dispatch<React.SetStateAction<Video[]>>
): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/videos/${id}`);
    fetchHistory(setHistory);
  } catch (error) {
    console.error('Error deleting video:', error);
  }
};

export const handleSearchChange = (
  e: ChangeEvent<HTMLInputElement>,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  setSearchResults: React.Dispatch<React.SetStateAction<YoutubeSearchResult[]>>
) => {
  setSearchQuery((e.target as HTMLInputElement).value);
  if ((e.target as HTMLInputElement).value.length >= 3) {
    handleSearch((e.target as HTMLInputElement).value, setSearchResults);
  } else {
    setSearchResults([]);
  }
};
