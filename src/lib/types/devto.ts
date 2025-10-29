export interface DevtoFeed {
  url: string;
  title: string;
  limit: number;
}

export interface DevtoArticle {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  feedTitle: string;
  tags: string[];
  author?: string;
  thumbnail?: string;
}
