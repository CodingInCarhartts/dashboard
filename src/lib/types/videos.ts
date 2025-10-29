export interface YoutubeChannel {
  id: string;
  name: string;
}

export interface YouTubeApiItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
}

export interface YouTubeApiResponse {
  items: YouTubeApiItem[];
}

export interface Video {
  title: string;
  link: string;
  published: string;
  thumbnail: string;
}
