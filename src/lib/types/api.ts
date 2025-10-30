/* eslint-disable @typescript-eslint/no-empty-interface */
import type { KickApiResponse } from './kick';
import type { DevtoArticle } from './devto';
import type { Market } from './markets';
import type { EconomicIndicator } from './economic';
import type { GitHubRepo } from './github';
import type { RedditPost } from './reddit';
import type { Provider, ChatModel, Message } from './chat';
import type { HNStory } from './hacker-news';
import type { WeatherApiResponse } from './weather';
import type { YouTubeApiResponse } from './videos';
import type { RssApiResponse } from './rss';

export interface KickService {
  fetchKickChannels(channelSlugs: string[]): Promise<KickApiResponse>;
}

export interface DevtoService {
  fetchDevtoArticles(): Promise<DevtoArticle[]>;
}

export interface MarketsService {
  fetchMarkets(markets: Array<{symbol: string, name: string}>, forceRefresh?: boolean): Promise<Market[]>;
}

export interface EconomicService {
  fetchEconomicIndicators(): Promise<EconomicIndicator[]>;
}

export interface GithubService {
  fetchGithubRepos(username: string, limit: number): Promise<GitHubRepo[]>;
}

export interface RedditService {
  fetchRedditPosts(subreddit: string): Promise<RedditPost[]>;
}

export interface YoutubeService {
  fetchYoutubeVideos(channelId: string): Promise<YouTubeApiResponse>;
}

export interface RssService {
  fetchRss(feedUrl: string): Promise<RssApiResponse>;
}

export interface ChatService {
  getAvailableModels(provider: Provider): ChatModel[];
  getChatResponse(provider: Provider, messages: Array<Pick<Message, 'role' | 'content'>>, options?: {maxTokens?: number, temperature?: number, model?: string}): Promise<{response: string, usage?: any}>;
}

export interface WeatherService {
  fetchWeather(latitude: number, longitude: number, units: string): Promise<WeatherApiResponse>;
}

export interface HackerNewsService {
  fetchHackerNews(): Promise<HNStory[]>;
}
