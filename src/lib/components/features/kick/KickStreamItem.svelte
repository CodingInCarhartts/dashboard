<script lang="ts">
  import type { KickChannel } from '$lib/types';
  export let channel: KickChannel;
</script>

<div class="kick-item">
  <a href={`https://kick.com/${channel.slug}`} target="_blank" rel="noopener">
    <img src={channel.stream.thumbnail} alt={channel.stream_title} class="thumbnail" />
    <div class="stream-info">
      <h4>{channel.stream_title}</h4>
      <p>{channel.slug} • {channel.category.name}</p>
      <span class="viewers">{channel.stream.viewer_count.toLocaleString()} viewers</span>
    </div>
  </a>
</div>