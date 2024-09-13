import React, { useContext } from 'react';
import { GlobalContext } from './UserContext';
import { VideoPlayerData } from '../types';
import './../styles/VideoPlayer.css';

/**
 * The VideoPlayer component.
 *
 * Renders the YouTube video that was clicked on the search results/history list.
 *
 * @component
 * @usedby ./App.tsx
 */
const VideoPlayer = React.memo(() => {
  /** The relevant context passed from the global context */
  const { currentVideo } = useContext<VideoPlayerData>(GlobalContext);

  return (
    <div className="video-player">
      {currentVideo && (
        <iframe
          src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
});

export default VideoPlayer;
