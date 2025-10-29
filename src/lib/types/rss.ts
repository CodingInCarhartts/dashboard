export interface RssFeed {
  url: string;
  title: string;
  limit: number;
}

export interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  feedTitle: string;
}

export interface RssApiResponse {
  items: RssItem[];
}
