
Provides a simple tool to aid in copying github labels from one source rep to other target repos.

## Running

1. Install `npm`, `yeoman` https://yeoman.io/
2. From source folder run `yo github-label-transfer`
3. Follow prompts

## Actions

### Copy Labels
1. Ask for Source repo
2. List labels, and select all you want to copy
3. Ask for destination repos, `null` to end entry
4. Perform copy on each repo
    a. If label does not exist, create
    b. If label exists, and is not to spec, update