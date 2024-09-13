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

export interface Video {
  _id: string;
  videoId: string;
  title: string;
  thumbnail: string;
}

export interface VideosHistoryData {
  history: Video[];
  setHistory: React.Dispatch<React.SetStateAction<Video[]>>;
  searchResults: YoutubeSearchResult[];
  setSearchResults: React.Dispatch<React.SetStateAction<YoutubeSearchResult[]>>;
  setCurrentVideo: React.Dispatch<React.SetStateAction<string>>;
}

export interface SearchBoxData {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSearchResults: React.Dispatch<React.SetStateAction<YoutubeSearchResult[]>>;
  searchResults: YoutubeSearchResult[];
}

export interface SearchResultsData {
  searchResults: YoutubeSearchResult[];
  setSearchResults: React.Dispatch<React.SetStateAction<YoutubeSearchResult[]>>;
  setCurrentVideo: React.Dispatch<React.SetStateAction<string>>;
  setHistory: React.Dispatch<React.SetStateAction<Video[]>>;
}

export interface VideoPlayerData {
  currentVideo: string;
}

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
