import React, { useContext } from 'react';
import { GlobalContext } from './UserContext';
import { handlePlay } from '../utils/functions';
import { SearchResultsData } from '../types';
import './../styles/SearchResults.css';

/**
 * The SearchResults component.
 *
 * Renders the YouTube videos relevant to the search input text.
 *
 * @component
 * @usedby ./SearchBox.tsx
 */
const SearchResults = React.memo(() => {
  /** The relevant context passed from the global context */
  const { searchResults, setSearchResults, setCurrentVideo, setHistory } =
    useContext<SearchResultsData>(GlobalContext);

  return (
    <ul className="search-results">
      {searchResults.map(video => (
        <li key={video.id.videoId} className="search-result-item">
          <img
            src={video.snippet.thumbnails.default.url}
            alt={video.snippet.title}
          />
          <span>{video.snippet.title}</span>
          <button
            onClick={() =>
              handlePlay(video, setCurrentVideo, setHistory, setSearchResults)
            }
          >
            Play
          </button>
        </li>
      ))}
    </ul>
  );
});

export default SearchResults;
