/**
 * Interface representing a YouTube search result object.
 *
 * @interface
 * @usedby ./components/App.tsx
 * @usedby ./utils/functions.ts
 */
export interface YoutubeSearchResult {
  kind: 'youtube#searchResult';
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };
}

/**
 * Interface representing a Video object represented as represented
 * in the MongoDB database.
 *
 * @interface
 * @usedby ./components/App.tsx
 * @usedby ./utils/functions.ts
 */
export interface Video {
  _id: string;
  videoId: string;
  title: string;
  thumbnail: string;
}

/**
 * Interface representing the context object in the "VideosHistory"
 * component.
 *
 * @interface
 * @usedby ./components/VideosHistory.tsx
 */
export interface VideosHistoryData {
  history: Video[];
  setHistory: React.Dispatch<React.SetStateAction<Video[]>>;
  searchResults: YoutubeSearchResult[];
  setSearchResults: React.Dispatch<React.SetStateAction<YoutubeSearchResult[]>>;
  setCurrentVideo: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Interface representing the context object in the "SearchBox"
 * component.
 *
 * @interface
 * @usedby ./components/SearchBox.tsx
 */
export interface SearchBoxData {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSearchResults: React.Dispatch<React.SetStateAction<YoutubeSearchResult[]>>;
  searchResults: YoutubeSearchResult[];
}

/**
 * Interface representing the context object in the "SearchResults"
 * component.
 *
 * @interface
 * @usedby ./components/SearchResults.tsx
 */
export interface SearchResultsData {
  searchResults: YoutubeSearchResult[];
  setSearchResults: React.Dispatch<React.SetStateAction<YoutubeSearchResult[]>>;
  setCurrentVideo: React.Dispatch<React.SetStateAction<string>>;
  setHistory: React.Dispatch<React.SetStateAction<Video[]>>;
}

/**
 * Interface representing the context object in the "VideoPlayer"
 * component.
 *
 * @interface
 * @usedby ./components/VideoPlayer.tsx
 */
export interface VideoPlayerData {
  currentVideo: string;
}

/**
 * Interface representing the initial context object.
 *
 * @interface
 * @usedby ./components/App.tsx
 */
export interface ContextInitialValues {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  currentVideo: string;
  searchResults: YoutubeSearchResult[];
  history: Video[];
  setSearchResults: React.Dispatch<React.SetStateAction<YoutubeSearchResult[]>>;
  setCurrentVideo: React.Dispatch<React.SetStateAction<string>>;
  setHistory: React.Dispatch<React.SetStateAction<Video[]>>;
}
