export const CACHE_CONFIG = {
  hackerNews: { ttl: 10 * 60 * 1000 }, // 10 minutes
  weather: { ttl: 5 * 60 * 1000 }, // 5 minutes
  rss: { ttl: 60 * 60 * 1000 }, // 1 hour
  youtube: { ttl: 2 * 60 * 60 * 1000 }, // 2 hours
  kick: { ttl: 2 * 60 * 1000 }, // 2 minutes for live streams
  twitch: { ttl: 2 * 60 * 1000 }, // 2 minutes for live streams
  reddit: { ttl: 60 * 60 * 1000 }, // 1 hour
  github: { ttl: 30 * 60 * 1000 }, // 30 minutes
  markets: { ttl: 5 * 60 * 1000 }, // 5 minutes
  devto: { ttl: 30 * 60 * 1000 }, // 30 minutes
  economic: { ttl: 60 * 60 * 1000 }, // 1 hour for economic data
  sizeManagement: {
    maxTotalSize: 4 * 1024 * 1024, // 4MB
    compressionThreshold: 1024, // 1KB
    maxEntrySize: 100 * 1024, // 100KB
    evictionThreshold: 0.8, // Evict at 80% capacity
  },
};
