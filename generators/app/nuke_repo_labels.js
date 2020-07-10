require('dotenv').config();
const GithubClient = require('./GithubClient.js');
const GithubValidator = require('./GithubValidator');

const run = () => {
  const targetRepoUrl = "https://git.hubteam.com/HubSpot/WebhooksPlatform/labels";
  const targetRepo = GithubValidator.validateRepoUrl(targetRepoUrl);

  GithubClient.getLabels(targetRepo).then(
    targetLabelsResp => {
      const labelNames = targetLabelsResp.body.map(labelOption => labelOption.name)
      for (const labelToDelete of labelNames) {
        GithubClient.deleteLabel(targetRepo, labelToDelete);
      }
    }
  )
}

run();