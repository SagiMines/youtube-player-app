import React, { useContext } from 'react';
import { GlobalContext } from './UserContext';
import { VideoPlayerData } from '../types';
import './../styles/VideoPlayer.css';

const VideoPlayer = React.memo(() => {
  const { currentVideo } = useContext<VideoPlayerData>(GlobalContext);

  return (
    <div className="video-player">
      {currentVideo && (
        <iframe
          src={`https://www.youtube.com/embed/${currentVideo}`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
});

export default VideoPlayer;
