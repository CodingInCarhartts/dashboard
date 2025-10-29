<script lang="ts">
  import type { HNStory } from '$lib/types';
  export let story: HNStory;
</script>

<li class="hn-item">
  <a href={story.url || `https://news.ycombinator.com/item?id=${story.id}`} target="_blank" rel="noopener">
    <strong>{story.title}</strong>
  </a>
  <div class="meta">
    <span>{story.score} points</span>
    <span>by {story.by}</span>
    <span>{new Date(story.time * 1000).toLocaleDateString()}</span>
  </div>
</li>