import { json, type RequestHandler } from '@sveltejs/kit';
import { REDDIT_ID, REDDIT_SECRET } from '$lib/env';

export const GET: RequestHandler = async ({ params }) => {
  const subreddit = params.subreddit;

  try {
    // Get access token
    const tokenResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${REDDIT_ID}:${REDDIT_SECRET}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenResponse.ok) {
      throw new Error(`Token request failed: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch posts
    const postsResponse = await fetch(`https://oauth.reddit.com/r/${subreddit}/hot?limit=10`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
        'User-Agent': 'DashboardApp/1.0',
      },
    });

    if (!postsResponse.ok) {
      throw new Error(`Posts request failed: ${postsResponse.status}`);
    }

    const postsData = await postsResponse.json();
    const posts = postsData.data.children.map((child: any) => child.data);

    return json(posts);
  } catch (error) {
    console.error('Reddit API error:', error);
    return json({ error: 'Failed to fetch Reddit posts' }, { status: 500 });
  }
};
