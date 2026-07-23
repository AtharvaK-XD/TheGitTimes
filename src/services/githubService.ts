export interface RawGitHubData {
  user: {
    login: string;
    name: string | null;
    avatar_url: string;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    location: string | null;
    company: string | null;
    blog: string | null;
    html_url: string;
  };
  repos: Array<{
    name: string;
    stargazers_count: number;
    language: string | null;
    forks_count: number;
    updated_at: string;
    description: string | null;
  }>;
  events: Array<{
    type: string;
    created_at: string;
  }>;
}

export async function fetchGitHubUserData(username: string): Promise<RawGitHubData> {
  const cleanUser = username.trim().replace(/^@/, '');
  if (!cleanUser) {
    throw new Error('Please enter a valid GitHub username.');
  }

  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${cleanUser}`),
    fetch(`https://api.github.com/users/${cleanUser}/repos?sort=updated&per_page=30`).catch(() => null),
    fetch(`https://api.github.com/users/${cleanUser}/events/public?per_page=50`).catch(() => null),
  ]);

  if (!userRes.ok) {
    if (userRes.status === 404) {
      throw new Error(`GitHub user "@${cleanUser}" not found. Please check the spelling.`);
    }
    if (userRes.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please wait a minute and try again.');
    }
    throw new Error(`GitHub API returned status ${userRes.status}.`);
  }

  const user = await userRes.json();
  const repos = reposRes && reposRes.ok ? await reposRes.json() : [];
  const events = eventsRes && eventsRes.ok ? await eventsRes.json() : [];

  return { user, repos, events };
}
