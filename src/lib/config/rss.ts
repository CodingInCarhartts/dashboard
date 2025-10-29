import type { RssFeed } from '../types';

export const RSS_CONFIG: { feeds: RssFeed[] } = {
  feeds: [
    { url: 'https://selfh.st/rss/', title: 'selfh.st', limit: 3 },
    { url: 'https://stackoverflow.blog/feed/', title: 'Stack Overflow Blog', limit: 3 },
    { url: 'https://medium.com/feed/hackernoon', title: 'Hackernoon', limit: 3 }
  ]
};
