import type { RedditPost, RedditService } from '../../types';

class RedditServiceImpl implements RedditService {
  async fetchRedditPosts(subreddit: string): Promise<RedditPost[]> {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`);
    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data.children.map((child: any) => child.data);
  }
}

export const redditService: RedditService = new RedditServiceImpl();
