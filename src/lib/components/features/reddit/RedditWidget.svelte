<script lang="ts">
  import { onMount } from 'svelte';
  import { redditService } from '$lib/services/reddit';
  import { REDDIT_CONFIG } from '$lib/config/reddit';
  import type { RedditPost } from '$lib/types';
  import './reddit.css';

  let loading = true;
  let error = '';
  let posts: RedditPost[] = [];

  onMount(async () => {
    try {
      const subreddit = REDDIT_CONFIG.subreddits[0].name;
      posts = await redditService.fetchRedditPosts(subreddit);
    } catch (err) {
      error = 'Failed to load Reddit posts';
      console.error('Error loading Reddit posts:', err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="widget">
  <h3>Reddit Posts</h3>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>{error}</p>
  {:else}
    <ul class="reddit-list">
      {#each posts as post}
        <li class="reddit-item">
          <a href={post.url} target="_blank" rel="noopener">
            <strong>{post.title}</strong>
          </a>
          <div class="meta">
            <span>{post.score} points</span>
            <span>by {post.author}</span>
            <span>{new Date(post.created_utc * 1000).toLocaleDateString()}</span>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
