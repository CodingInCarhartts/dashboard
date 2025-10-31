import type { RedditPost, RedditService } from '../../types';

class RedditServiceImpl implements RedditService {
  async fetchRedditPosts(subreddit: string): Promise<RedditPost[]> {
    const response = await fetch(`/api/reddit/${subreddit}`);
    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  }
}

export const redditService: RedditService = new RedditServiceImpl();
