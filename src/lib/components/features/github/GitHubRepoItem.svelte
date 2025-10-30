<script lang="ts">
  import type { GitHubRepo } from '$lib/types';
  export let repo: GitHubRepo;

  function getLanguageColor(language: string): string {
    const colors: Record<string, string> = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      Java: '#ed8c33',
      'C++': '#f34b7d',
      'C#': '#239120',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Dart: '#00B4AB',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Shell: '#89e051',
      // Default
      default: '#586069'
    };
    return colors[language] || colors.default;
  }

  function getBadgeClasses(language: string | null): string {
    if (!language) {
      return 'bg-white text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-sm border border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600';
    }

    const colorMap: Record<string, string> = {
      JavaScript: 'bg-white text-gray-800 border border-yellow-400 dark:bg-gray-800 dark:text-gray-200 dark:border-yellow-500',
      TypeScript: 'bg-white text-gray-800 border border-blue-400 dark:bg-gray-800 dark:text-gray-200 dark:border-blue-500',
      Python: 'bg-white text-gray-800 border border-green-400 dark:bg-gray-800 dark:text-gray-200 dark:border-green-500',
      Java: 'bg-white text-gray-800 border border-red-400 dark:bg-gray-800 dark:text-gray-200 dark:border-red-500',
      'C++': 'bg-white text-gray-800 border border-pink-400 dark:bg-gray-800 dark:text-gray-200 dark:border-pink-500',
      'C#': 'bg-white text-gray-800 border border-purple-400 dark:bg-gray-800 dark:text-gray-200 dark:border-purple-500',
      PHP: 'bg-white text-gray-800 border border-indigo-400 dark:bg-gray-800 dark:text-gray-200 dark:border-indigo-500',
      Ruby: 'bg-white text-gray-800 border border-red-400 dark:bg-gray-800 dark:text-gray-200 dark:border-red-500',
      Go: 'bg-white text-gray-800 border border-cyan-400 dark:bg-gray-800 dark:text-gray-200 dark:border-cyan-500',
      Rust: 'bg-white text-gray-800 border border-orange-400 dark:bg-gray-800 dark:text-gray-200 dark:border-orange-500',
      Swift: 'bg-white text-gray-800 border border-orange-400 dark:bg-gray-800 dark:text-gray-200 dark:border-orange-500',
      Kotlin: 'bg-white text-gray-800 border border-purple-400 dark:bg-gray-800 dark:text-gray-200 dark:border-purple-500',
      Dart: 'bg-white text-gray-800 border border-cyan-400 dark:bg-gray-800 dark:text-gray-200 dark:border-cyan-500',
      HTML: 'bg-white text-gray-800 border border-orange-400 dark:bg-gray-800 dark:text-gray-200 dark:border-orange-500',
      CSS: 'bg-white text-gray-800 border border-blue-400 dark:bg-gray-800 dark:text-gray-200 dark:border-blue-500',
      Shell: 'bg-white text-gray-800 border border-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-500',
    };

    const baseClasses = 'text-xs font-medium px-2.5 py-0.5 rounded-sm';
    const colorClasses = colorMap[language] || 'bg-white text-gray-800 border border-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-500';

    return `${baseClasses} ${colorClasses}`;
  }
</script>

<div class="github-item">
  <a href={repo.html_url} target="_blank" rel="noopener" class="repo-link">
    <span class={getBadgeClasses(repo.language)}>{repo.name}</span>

    <div class="repo-meta">
      {#if repo.language}
        <span class="language">
          <span class="language-dot" style="background-color: {getLanguageColor(repo.language)}"></span>
          {repo.language}
        </span>
      {/if}
      <span class="stars">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        {repo.stargazers_count}
      </span>
      {#if repo.forks_count}
        <span class="forks">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 3v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3"/>
            <path d="M9 7l3 3 3-3"/>
          </svg>
          {repo.forks_count}
        </span>
      {/if}
      <span class="updated">Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
    </div>
  </a>
</div>