const validateRepoUrl = (inputUrl) => {
    const url = new URL(inputUrl);
    const host = url.origin;
    const splitPath = url.pathname.split('/');
    const owner = splitPath[1];
    const repo = splitPath[2];

    if (!owner || !repo) {
        throw new Error("You must enter a url with the format of `https://{githubBaseUrl}/{owner}/{repo}.`");
    }

    return {
        host,
        owner,
        repo,
    };
}

module.exports = {
    validateRepoUrl,
};
