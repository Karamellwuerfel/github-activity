
# GitHub Activity CLI

## Description

`github-activity` is a simple command-line interface (CLI) tool written in TypeScript that fetches the recent activity of a GitHub user and displays it in the terminal. The project was developed to improve skills in Node.js and TypeScript while providing a practical tool for exploring GitHub user activity.

## Features

- Fetch recent activities of a GitHub user using the GitHub API.
- Display activities such as starred repositories, pushed commits, opened issues, and more in a human-readable format.
- Configurable number of activities to display.

## Prerequisites

- Node.js (v14 or higher)
- GitHub API access (public API, no token required unless rate-limited)

## Installation

You can install the CLI tool globally using npm:

```bash
npm install -g github-activity
```

Or you can run it locally without installing:

```bash
npx github-activity <username>
```

## Usage

The basic command structure is:

```bash
github-activity <username> [options]
```

### Examples

1. Fetch and display the last 5 activities for a user:

```bash
github-activity johndoe
```

**Output:**
```
Activities of johndoe:
- Starred johndoe/my-repo
- Pushed 3 commit(s) to johndoe/another-repo
- Opened an issue in johndoe/sample-repo
- Created a new branch (feature-branch) in johndoe/another-repo
- Published v1.0.0 release in johndoe/my-repo
```

2. Fetch and display the last 10 activities for a user:

```bash
github-activity johndoe -n 10
```

3. If no username is provided:

```bash
github-activity
```

**Output:**
```
Error: Please provide a GitHub username.
Usage: github-activity <username>
```

## Options

- `-n, --numbers <number>`: Defines how many activities should be listed (default is `5`).


## Development

This project is written in TypeScript and uses Node.js. To run and develop the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Karamellwuerfel/github-activity.git
cd github-activity
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Run the project:

```bash
npm start <username>
```

5. Link the CLI tool for global usage during development:

```bash
npm link
```

Now you can use `github-activity` globally from anywhere in your terminal.

## API Reference

The tool uses the GitHub REST API:

- **Endpoint:** `https://api.github.com/users/{username}/events`
- **Rate Limits:** The API has rate limits for unauthenticated requests (60 requests per hour). If you need higher limits, consider using a GitHub API token.

## Acknowledgments

- This project was built to improve skills in Node.js and TypeScript.
