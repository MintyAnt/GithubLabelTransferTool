'use strict'

var GithubUrl = require('./GithubUrl.js');

const validateRepoUrl = (inputUrl) => {
    const url = new URL(inputUrl);
    const splitPath = url.pathname.split('/');
    const owner = splitPath[1];
    const repo = splitPath[2];

    if (!owner || !repo) {
        throw new Error("You must enter a url with the format of `https://{githubBaseUrl}/{owner}/{repo}.`");
    }

    return new GithubUrl(url.origin, owner, repo);
}

exports.validateRepoUrl = validateRepoUrl;