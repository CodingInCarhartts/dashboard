<script lang="ts">
  import { onMount } from "svelte";
  import { GITHUB_CONFIG } from "$lib/config";
  import { githubService } from "$lib/services/github";
  import type { GitHubRepo } from "$lib/types";
  import { GitHubRepoItem } from "./";
  import '$lib/styles/components/features/github.css';

  let repos: GitHubRepo[] = [];
  let loading = true;
  let error = "";

  onMount(async () => {
    try {
      repos = await githubService.fetchGithubRepos(
        GITHUB_CONFIG.username,
        GITHUB_CONFIG.limit,
      );
    } catch (err) {
      error = "Failed to load GitHub repos";
      console.error("Error loading GitHub repos:", err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="widget-hub">
  <h3>GitHub Repos</h3>
  {#if loading}
    <div class="github-grid">
      {#each Array(6) as _}
        <div class="github-item skeleton">
          <div class="skeleton-title"></div>
          <div class="skeleton-desc"></div>
          <div class="skeleton-meta"></div>
        </div>
      {/each}
    </div>
  {:else if error}
    <p class="error">{error}</p>
  {:else if repos.length === 0}
    <p class="empty">No repositories found</p>
  {:else}
    <div class="github-grid">
      {#each repos as repo}
        <GitHubRepoItem {repo} />
      {/each}
    </div>
  {/if}
</div>

