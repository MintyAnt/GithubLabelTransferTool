
Provides a simple tool to aid in copying github labels from one source rep to other target repos.

## Setup

1. Install `npm`, `yeoman` https://yeoman.io/
2. Run `npm install`
3. From source folder run `cp .env-template .env`
4. Obtain a [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
5. Update `.env` with your token

## Running

1. From source folder run `yo github-label-transfer`
2. Follow prompts

## Actions

### Copy Labels
1. Ask for Source repo
2. List labels, and select all you want to copy
3. Ask for destination repos, `null` to end entry
4. Perform copy on each repo
    a. If label does not exist, create
    b. If label exists, and is not to spec, update