<script lang="ts">
  import type { TwitchStream } from '$lib/types';

  interface Props {
    stream: TwitchStream;
  }

  let { stream }: Props = $props();
</script>

<div class="twitch-stream-item">
  <a href="https://twitch.tv/{stream.user_login}" target="_blank" rel="noopener noreferrer">
    <img src="{stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180')}" alt="{stream.title}" class="stream-thumbnail" loading="lazy" />
    <div class="stream-info">
      <h4>{stream.title}</h4>
      <small>{stream.user_name}</small>
      <small>{stream.game_name} • {stream.viewer_count.toLocaleString()} viewers</small>
    </div>
  </a>
</div>
