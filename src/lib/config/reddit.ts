import type { Subreddit } from '../types';

export const REDDIT_CONFIG: { subreddits: Subreddit[] } = {
  subreddits: [
    { name: 'programming', showThumbnails: false },
    { name: 'technology', showThumbnails: true },
    { name: 'selfhosted', showThumbnails: true },
    { name: 'livestreamfails', showThumbnails: true },
    { name: 'pcgaming', showThumbnails: true },
    { name: 'games', showThumbnails: true },
    { name: 'gamingnews', limit: 7 }
  ]
};
