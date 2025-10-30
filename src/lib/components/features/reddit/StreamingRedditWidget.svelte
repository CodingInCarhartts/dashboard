<script lang="ts">
  import { onMount } from 'svelte';
  import { redditService } from '$lib/services/reddit';
  import type { RedditPost } from '$lib/types';
  import './reddit.css';

  let loading = true;
  let error = '';
  let posts: RedditPost[] = [];

  onMount(async () => {
    try {
      const subreddit = 'livestreamfails';
      posts = await redditService.fetchRedditPosts(subreddit);
    } catch (err) {
      error = 'Failed to load Livestream Fails posts';
      console.error('Error loading Livestream Fails posts:', err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="widget">
  <h3>Livestream Fails</h3>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>{error}</p>
  {:else}
    <ul class="reddit-list">
      {#each posts as post}
        <li class="reddit-item">
          <a href={post.url} target="_blank" rel="noopener">
            {#if post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default'}
              <img src={post.thumbnail} alt="" class="thumbnail" />
            {/if}
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