import type { YoutubeService, YouTubeApiResponse } from '../../types';

class YoutubeServiceImpl implements YoutubeService {
  async fetchYoutubeVideos(channelId: string): Promise<YouTubeApiResponse> {
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)}`
    );
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }
    return await response.json();
  }
}

export const youtubeService: YoutubeService = new YoutubeServiceImpl();
