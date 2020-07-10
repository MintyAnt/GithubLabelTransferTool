'use strict'

const GithubClient = require('./GithubClient.js');

const copyLabels = (targetRepos, labelsToCopy) => {
  for (const targetRepo of targetRepos) {
    console.log('Performing updates on ', targetRepo);
    GithubClient.getLabels(targetRepo).then(
      targetLabelsResp => copyLabelsForRepo(targetLabelsResp, labelsToCopy)
    );
  }
};

const copyLabelsForRepo = (targetLabelsResp, labelsToCopy) => {
  for (const labelToCopy of labelsToCopy) {
    console.log('Copying label: ', labelToCopy);

    const existingLabel = targetLabelsResp.body.find(
      labelResp => 
        labelResp.name.toUpperCase() == labelToCopy.name.toUpperCase()
      );
    if (!existingLabel) {
      // create
      GithubClient.createLabel(targetRepo, labelToCopy);
    } else if (existingLabel.name != labelToCopy.name || existingLabel.color != labelToCopy.color || existingLabel.description != labelToCopy.description) {
      // update
      GithubClient.updateLabel(targetRepo, labelToCopy);
    } else {
      // no update
      console.log("Nothing to update for ", existingLabel.name);
    }
  }
};

module.exports = {
  copyLabels,
}
