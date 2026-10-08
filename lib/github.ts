export type GitHubRepo = {
  id: number;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
};

export async function fetchGitHubRepos(query: string): Promise<{ items?: GitHubRepo[]; error?: string }> {
  try {
    const token = process.env.GITHUB_TOKEN || '';
    const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=5`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'drakiller',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return { error: 'GitHub API limit or configuration issue' };
    }

    const data = await res.json();
    return { items: data.items || [] };
  } catch (error) {
    return { error: 'GitHub search failed' };
  }
}
