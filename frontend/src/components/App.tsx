import { useState, useEffect } from 'react';
import { GlobalContext } from './UserContext';
import SearchAndResults from './SearchAndResults';
import VideosHistory from './VideosHistory';
import { ContextInitialValues, Video, YoutubeSearchResult } from '../types';
import { fetchHistory } from '../utils/functions';
import './../styles/App.css';
import VideoPlayer from './VideoPlayer';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<YoutubeSearchResult[]>([]);
  const [history, setHistory] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState('');

  const contextInitialValues: ContextInitialValues = {
    searchQuery,
    setSearchQuery,
    currentVideo,
    searchResults,
    history,
    setSearchResults,
    setCurrentVideo,
    setHistory,
  };

  useEffect(() => {
    fetchHistory(setHistory);
  }, []);

  return (
    <GlobalContext.Provider value={contextInitialValues}>
      <div className="app">
        <SearchAndResults />
        <div className="main-content">
          <VideosHistory />
          <VideoPlayer />
        </div>
      </div>
    </GlobalContext.Provider>
  );
};

export default App;
