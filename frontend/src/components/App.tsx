import { useState, useEffect } from 'react';
import { GlobalContext } from './UserContext';
import SearchAndResults from './SearchAndResults';
import VideosHistory from './VideosHistory';
import VideoPlayer from './VideoPlayer';
import { ContextInitialValues, Video, YoutubeSearchResult } from '../types';
import { fetchHistory } from '../utils/functions';
import './../styles/App.css';

/**
 * The initial App component.
 *
 * Here all the states are managed and the videos history is fetched.
 *
 * @component
 * @usedby ./../main.tsx
 */
const App = () => {
  /** Holds the search input's current value */
  const [searchQuery, setSearchQuery] = useState('');
  /** Holds an array of the YouTube videos objects found according to the search input */
  const [searchResults, setSearchResults] = useState<YoutubeSearchResult[]>([]);
  /** Holds an array of the clicked YouTube videos objects */
  const [history, setHistory] = useState<Video[]>([]);
  /** Holds the current playing YouTube video's ID as a string */
  const [currentVideo, setCurrentVideo] = useState('');

  /** The passed context to the nested components */
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

  /** Fetches the clicked videos history list only on first render */
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
