import type { HNStory } from '../../types';

export async function fetchHackerNewsApi(): Promise<HNStory[]> {
  const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  if (!response.ok) {
    throw new Error(`Hacker News API error: ${response.statusText}`);
  }
  const storyIds = await response.json();
  const topIds = storyIds.slice(0, 10);

  const storyPromises = topIds.map(async (id: number) => {
    const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    if (!storyResponse.ok) {
      throw new Error(`Hacker News API error for item ${id}: ${storyResponse.statusText}`);
    }
    return await storyResponse.json();
  });

  const stories = await Promise.all(storyPromises);
  return stories
    .filter((story) => story && story.type === 'story')
    .map((story) => ({
      id: story.id,
      title: story.title,
      url: story.url,
      score: story.score,
      by: story.by,
      time: story.time,
    }));
}
