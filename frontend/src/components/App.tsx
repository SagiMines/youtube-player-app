import { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles/App.css';

interface Video {
  _id: string;
  videoId: string;
  title: string;
  thumbnail: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [history, setHistory] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/videos`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${YOUTUBE_API_KEY}`
      );
      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error searching videos:', error);
    }
  };

  const handlePlay = async (video: any) => {
    setCurrentVideo(video.id.videoId);
    try {
      await axios.post(`${API_BASE_URL}/videos`, {
        videoId: video.id.videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.default.url,
      });
      fetchHistory();
    } catch (error) {
      console.error('Error adding video to history:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/videos/${id}`);
      fetchHistory();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div className="app">
      <h1>YouTube Search and Player</h1>
      <div className="main-content">
        <div className="search-and-results">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search YouTube"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="video-player">
            {currentVideo && (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${currentVideo}`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <ul className="search-results">
            {searchResults.map(video => (
              <li key={video.id.videoId} className="search-result-item">
                <img
                  src={video.snippet.thumbnails.default.url}
                  alt={video.snippet.title}
                />
                <span>{video.snippet.title}</span>
                <button onClick={() => handlePlay(video)}>Play</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="history">
          <h2>History</h2>
          <ul className="history-list">
            {history.map(video => (
              <li key={video._id} className="history-item">
                <span>{video.title}</span>
                <button onClick={() => handleDelete(video._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
