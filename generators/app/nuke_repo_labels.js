require('dotenv').config();
const GithubClient = require('./GithubClient.js');
const GithubValidator = require('./GithubValidator');

const targetRepoUrl = "";
const labelsToIgnore = [
  "deployed-PROD",
  "deployed-QA",
  "Epic",
];

const run = () => {
  const targetRepo = GithubValidator.validateRepoUrl(targetRepoUrl);

  GithubClient.getLabels(targetRepo).then(
    targetLabelsResp => {
        
      const labelNames = targetLabelsResp.body.map(labelOption => labelOption.name)
      for (const labelToDelete of labelNames) {
        const labelInSkipList = labelsToIgnore.find(
          ignoreLabel => ignoreLabel.toUpperCase() == labelToDelete.toUpperCase()
        );

        if (!labelInSkipList) {
          GithubClient.deleteLabel(targetRepo, labelToDelete);
        }
      }
    }
  )
}

run();