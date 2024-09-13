import axios from 'axios';
import { Video, YoutubeSearchResult } from '../types';
import { ChangeEvent } from 'react';

/** The "API_BASE_URL" environment variable */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
/** The "YOUTUBE_API_KEY" environment variable */
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

/**
 * @function fetchHistory
 *
 * If the API call succeed - fetches the clicked YouTube videos list from the API and
 * sets the state with the returned value.
 * If the API call fails - throws an error.
 *
 * @param setHistory The "history" state set function.
 *
 * @usedby ./../components/App.tsx
 * @usedby ./../components/SearchResults.tsx
 * @usedby ./../components/VideosHistory.tsx
 */
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

/**
 * @function handleSearch
 *
 * If the API call succeed - fetches the relevant YouTube videos from the Google Youtube API
 * based on the search input text.
 *
 * If the API call fails - throws an error.
 *
 * @param searchQuery The search input's current text value.
 * @param setSearchResults The "searchResults" state set function.
 */
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
    console.error('Error searching videos:', error);
  }
};

/**
 * @function handlePlay
 *
 * If the API call succeed - adds the played YouTube video details to the history
 * list in the database and updates the "history" state with the updated list.
 *
 * If the API call fails - throws an error.
 *
 * @param video The YouTube video object as recieved from the Google YouTube API.
 * @param setCurrentVideo The "currentVideo" state set function.
 * @param setHistory The "history" state set function.
 * @param setSearchResults The "searchResults" state set function.
 *
 * @usedby ./../components/SearchResults.tsx
 */
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

/**
 * @function handleHistoryPlay
 *
 * Sets the "currentVideo" state with the video ID of the video clicked
 * in the history list. Also, if the "searchResults" array state is not empty
 * we set an empty array.
 *
 * @param videoId The YouTube ID.
 * @param searchResults The "searchResults" state.
 * @param setCurrentVideo The "currentVideo" state set function.
 * @param setSearchResults The "searchResults" state set function.
 *
 * @usedby ./../components/VideosHistory.tsx
 */
export const handleHistoryPlay = (
  videoId: string,
  searchResults: YoutubeSearchResult[],
  setCurrentVideo: React.Dispatch<React.SetStateAction<string>>,
  setSearchResults: React.Dispatch<React.SetStateAction<YoutubeSearchResult[]>>
): void => {
  setCurrentVideo(videoId);
  if (searchResults.length) setSearchResults([]);
};

/**
 * @function handleDelete
 *
 * If the API call succeed - deletes the YouTube video with the provided "id"
 * prop from the database and calls the "fetchHistory" function to update the "history"
 * state with the updated list.
 *
 * If the API call fails - throws an error.
 *
 * @param id The database ID of the video to delete.
 * @param setHistory The "history" state set function.
 *
 * @usedby ./../components/VideosHistory.tsx
 */
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

/**
 * @function handleSearchChange
 *
 * Checks if the search input value has atleast 3 characters, if it does
 * the function calls the "handleSearch" function.
 * If the search input value has less than 3 character we simply
 * update the "searchResults" state to an empty array.
 *
 * @param e The change event of the search input.
 * @param setSearchQuery The "searchQuery" state set function.
 * @param setSearchResults The "searchResults" state set function.
 *
 * @usedby ./../components/SearchBox.tsx
 */
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
