import type { YoutubeService, YouTubeApiResponse } from '../../types';
import { YOUTUBE_API_KEY } from '../../env';

class YoutubeServiceImpl implements YoutubeService {
  async fetchYoutubeVideos(channelId: string): Promise<YouTubeApiResponse> {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=10&key=${YOUTUBE_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }
    const data = await response.json();
    // Transform to match existing interface
    const items = data.items.map((item: any) => ({
      title: item.snippet.title,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      pubDate: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
    return { items };
  }
}

export const youtubeService: YoutubeService = new YoutubeServiceImpl();
