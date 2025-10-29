<script lang="ts">
  import type { Video } from '$lib/types';
  export let video: Video;
</script>

<div class="video-item">
  <a href={video.link} target="_blank" rel="noopener">
    <img src={video.thumbnail} alt={video.title} class="thumbnail" />
    <div class="video-info">
      <h4>{video.title}</h4>
      <small>{new Date(video.published).toLocaleDateString()}</small>
    </div>
  </a>
</div>