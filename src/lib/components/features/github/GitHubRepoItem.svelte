<script lang="ts">
  import type { GitHubRepo } from '$lib/types';
  export let repo: GitHubRepo;
</script>

<li class="github-item">
  <a href={repo.html_url} target="_blank" rel="noopener">
    <strong>{repo.name}</strong>
  </a>
  {#if repo.description}
    <p>{repo.description}</p>
  {/if}
  <div class="meta">
    {#if repo.language}
      <span>{repo.language}</span>
    {/if}
    <span>{repo.stargazers_count} stars</span>
    <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
  </div>
</li>