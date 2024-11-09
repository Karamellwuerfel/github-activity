#!/usr/bin/env node

import {program} from 'commander';
import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/users';

/**
 * Parses a json object of a GitHub event and returns a human-readable string.
 * @param githubEvent
 */
function parseGithubEvents(githubEvent: any): string {
    const repoName = githubEvent.repo?.name || 'unknown-repo';
    const actor = githubEvent.actor?.login || 'unknown-user';
    let eventString = "";

    // Check event type and define the correct description for it.
    switch (githubEvent?.type) {
        case 'WatchEvent':
            eventString = `Starred ${repoName}`;
            break;

        case 'PushEvent':
            const commitCount = githubEvent.payload?.commits?.length || 0;
            eventString = `Pushed ${commitCount} commit(s) to ${repoName}`;
            break;

        case 'PullRequestEvent':
            const action = githubEvent.payload?.action || 'performed an action on';
            eventString = `${actor} ${action} a pull request in ${repoName}`;
            break;

        case 'IssuesEvent':
            const issueAction = githubEvent.payload?.action || 'performed an action on';
            eventString = `${actor} ${issueAction} an issue in ${repoName}`;
            break;

        case 'ForkEvent':
            eventString = `Forked ${repoName} to ${actor}'s account`;
            break;

        case 'CreateEvent':
            const refType = githubEvent.payload?.ref_type || 'repository';
            const ref = githubEvent.payload?.ref || 'unknown';
            eventString = `Created a new ${refType} (${ref}) in ${repoName}`;
            break;

        case 'DeleteEvent':
            const deleteType = githubEvent.payload?.ref_type || 'entity';
            const deleteRef = githubEvent.payload?.ref || 'unknown';
            eventString = `Deleted ${deleteType} (${deleteRef}) in ${repoName}`;
            break;

        case 'IssueCommentEvent':
            const commentAction = githubEvent.payload?.action || 'commented on';
            eventString = `${actor} ${commentAction} an issue in ${repoName}`;
            break;

        case 'ReleaseEvent':
            const releaseName = githubEvent.payload?.release?.name || 'a release';
            eventString = `Published ${releaseName} in ${repoName}`;
            break;

        case 'ForkApplyEvent':
            eventString = `Applied a patch from a fork in ${repoName}`;
            break;

        case 'PublicEvent':
            eventString = `Made ${repoName} public`;
            break;

        case 'CommitCommentEvent':
            eventString = `Commented on a commit in ${repoName}`;
            break;

        case 'PullRequestReviewEvent':
            const reviewAction = githubEvent.payload?.action || 'reviewed';
            eventString = `${actor} ${reviewAction} a pull request in ${repoName}`;
            break;

        case 'PullRequestReviewCommentEvent':
            eventString = `Commented on a pull request review in ${repoName}`;
            break;

        default:
            eventString = `${actor} performed an unknown action (${githubEvent?.type}) in ${repoName}`;
            break;
    }

    return `- ${eventString}`;
}

/**
 * Fetches a GitHub user's activities.
 * @param username
 */
async function fetchGitHubActivity(username: string) {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/${username}/events`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Handles the command line action for fetching and displaying recent GitHub user activity.
 *
 * @param {string} username - The GitHub username to fetch activity for.
 * @param {object} options - An object containing additional options for the command.
 * @param {string} options.numbers - The number of activities to display (default is '5').
 *
 * @returns {void} - This function does not return a value, it prints the output to the terminal.
 *
 * @example
 * // Fetch and display the last 5 activities for a user
 * github-activity johndoe
 *
 * @example
 * // Fetch and display the last 10 activities for a user
 * github-activity johndoe -n 10
 *
 * @throws Will log an error message if the user has no recent activity or the fetch operation fails.
 */
program
    .name('github-activity')
    .description('A simple command line interface (CLI) to fetch the recent activity of a GitHub user and display it in the terminal.')
    .version('1.0.0')
    .argument('<username>', 'GitHub username')
    .option('-n, --numbers <number>', 'defines how many activities should be listed', '5')
    .action((username: string, options) => {
        if (username) {
            fetchGitHubActivity(username).then(events => {
                if (events.length === 0) {
                    console.warn(`No activities for user "${username}" found.`);
                    return;
                }

                console.log(`Activities of ${username}:`);
                events.slice(0, options.numbers).forEach((githubEvent: any, index: number) => {
                    console.log(parseGithubEvents(githubEvent));
                });
            });
        } else {
            console.error('Please provide an github username.');
        }

    })

program.parse();
