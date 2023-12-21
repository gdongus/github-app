import fetch from 'node-fetch';

// Replace with your personal access token
const TOKEN = 'your_github_token';

// Replace with your username and repository names
const USER = 'your_username';
const REPOS = ['repo1', 'repo2', 'repo3'];

async function setBranchProtection() {
  for (const REPO of REPOS) {
    const url = `https://api.github.com/repos/${USER}/${REPO}/branches/master/protection`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `token ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        required_status_checks: {
          strict: true,
          contexts: ['jenkins'],
        },
        enforce_admins: true,
        required_pull_request_reviews: {
          dismiss_stale_reviews: true,
        },
        restrictions: null,
      }),
    });

    if (!response.ok) {
      const message = await response.text();
      console.error(`Failed to set branch protection for ${REPO}: ${message}`);
    }
  }
}

setBranchProtection().catch(console.error);