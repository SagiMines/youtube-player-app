import React, { useContext } from 'react';
import { GlobalContext } from './UserContext';
import { VideosHistoryData } from '../types';
import { handleDelete, handleHistoryPlay } from '../utils/functions';
import './../styles/VideosHistory.css';

/**
 * The VideosHistory component.
 *
 * Renders a list of the YouTube videos that were clicked at watched from
 * the search results.
 *
 * @component
 * @usedby ./App.tsx
 */
const VideosHistory = React.memo(() => {
  /** The relevant context passed from the global context */
  const {
    history,
    setHistory,
    searchResults,
    setSearchResults,
    setCurrentVideo,
  } = useContext<VideosHistoryData>(GlobalContext);

  return (
    <div className="history">
      <h2>Watch History</h2>
      <ul className="history-list">
        {history.map(video => (
          <li key={video._id} className="history-item">
            <span
              className="history-list-video-name"
              onClick={() =>
                handleHistoryPlay(
                  video.videoId,
                  searchResults,
                  setCurrentVideo,
                  setSearchResults
                )
              }
            >
              {video.title}
            </span>
            <button onClick={() => handleDelete(video._id, setHistory)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default VideosHistory;
