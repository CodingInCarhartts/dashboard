import type { GitHubRepo, GithubService } from '../../types';
import { cache } from '../../cache';
import { CACHE_CONFIG } from '../../config/cache';

class GithubServiceImpl implements GithubService {
  async fetchGithubRepos(username: string, limit: number): Promise<GitHubRepo[]> {
    const cacheKey = `github_${username}_${limit}`;
    return cache.getOrFetch(
      cacheKey,
      async () => {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}&type=owner`
        );
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.statusText}`);
        }
        const repos = await response.json();
        return repos.filter((repo: any) => !repo.fork); // Only owned repos, not forks
      },
      CACHE_CONFIG.github.ttl
    );
  }
}

export const githubService: GithubService = new GithubServiceImpl();
