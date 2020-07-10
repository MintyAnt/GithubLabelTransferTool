
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

### Clearing repo of labels
1. Modify `nuke_repo_labels.js` to point to target repo
2. Verify the labels to ignore look good
3. Run `node generators/app/nuke_repo_labels.js`

## Updating an existing workspace

1. Define good labels in your main repo. Zenhub suggests grouping them by tags/buckets, and using the same color (or at least shade) for that bucket.
2. Go through your target repo's and clean them up. The tool only copies or updates labels of *the same name* (case insensitive). Clear out all odd labels, or rename ones in use to the right label (just the name, the script will fill in everything else)
3. Tip: Use the `nuke_repo_labels.js` script to clear out repos quickly
4. Run the generator and copy all labels!