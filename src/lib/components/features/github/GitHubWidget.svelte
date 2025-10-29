<script lang="ts">
  import { onMount } from "svelte";
  import { GITHUB_CONFIG } from "$lib/config";
  import { githubService } from "$lib/services/github";
  import type { GitHubRepo } from "$lib/types";
  import { GitHubRepoItem } from "./";
  import "./github.css";

  let repos: GitHubRepo[] = [];
  let loading = true;
  let error = "";
  let currentIndex = 0;
  let listElement: HTMLUListElement | undefined;

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

  function scrollToIndex(index: number) {
    if (!listElement || !repos.length) return;

    currentIndex = Math.max(0, Math.min(index, repos.length - 1));
    const item = listElement.children[currentIndex] as HTMLElement;
    if (item) {
      item.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function scrollNext() {
    scrollToIndex(currentIndex + 1);
  }

  function scrollPrev() {
    scrollToIndex(currentIndex - 1);
  }
</script>

<div class="widget-hub">
  
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>{error}</p>
  {:else}
    <ul class="github-list" bind:this={listElement}>
      {#each repos as repo, index}
        <li class="github-item" class:active={index === currentIndex}>
          <GitHubRepoItem {repo} />
        </li>
      {/each}
    </ul>
  {/if}
  <div class="github-header">
    <!-- <h3 class="github-title">GitHub Repos</h3> -->
    {#if !loading && !error && repos.length > 0}
      <div class="github-controls">
        <button
          class="nav-button"
          on:click={scrollPrev}
          disabled={currentIndex === 0}>←</button
        >
        <span class="repo-counter">{currentIndex + 1} / {repos.length}</span>
        <button
          class="nav-button"
          on:click={scrollNext}
          disabled={currentIndex === repos.length - 1}>→</button
        >
      </div>
    {/if}
  </div>
</div>

