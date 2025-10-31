<script lang="ts">
  import { onMount } from 'svelte';
  import { redditService } from '$lib/services/reddit';
  import { REDDIT_CONFIG } from '$lib/config/reddit';
  import type { RedditPost } from '$lib/types';
  import '$lib/styles/components/features/reddit.css';

  export let subreddits: string[] = REDDIT_CONFIG.entertainmentSubreddits.map(s => s.name);

  let loading = true;
  let error = '';
  let posts: RedditPost[] = [];

  onMount(async () => {
    try {
      const allPosts = await Promise.all(
        subreddits.map(async (sub) => {
          try {
            return await redditService.fetchRedditPosts(sub);
          } catch (err) {
            console.error(`Error loading ${sub} posts:`, err);
            return [];
          }
        })
      );
      posts = allPosts
        .flat()
        .sort((a, b) => b.created_utc - a.created_utc)
        .slice(0, 20);
    } catch (err) {
      error = 'Failed to load drama posts';
      console.error('Error loading drama posts:', err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="widget-drama">
  <h3>Streaming Drama</h3>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>{error}</p>
  {:else}
    <ul class="reddit-list">
      {#each posts as post}
        <li class="reddit-item">
          <a href={post.url} target="_blank" rel="noopener">
            {#if post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && REDDIT_CONFIG.entertainmentSubreddits.find(s => s.name === post.subreddit)?.showThumbnails}
              <img src={post.thumbnail} alt="" class="thumbnail" />
            {/if}
            <strong>{post.title}</strong>
          </a>
          <div class="meta">
            <span class="subreddit">r/{post.subreddit}</span>
            <span>{post.score} points</span>
            <span>by {post.author}</span>
            <span>{new Date(post.created_utc * 1000).toLocaleDateString()}</span>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>