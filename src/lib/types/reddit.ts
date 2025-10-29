export interface Subreddit {
  name: string;
  limit?: number;
  showThumbnails?: boolean;
}

export interface RedditPost {
  id: string;
  title: string;
  url: string;
  score: number;
  author: string;
  created_utc: number;
  subreddit: string;
  thumbnail?: string;
  selftext?: string;
}
