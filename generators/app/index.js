'use strict'

// import * as GithubClient from './generators/app/GithubClient.js'
var GithubClient = require('./GithubClient.js');
var Generator = require('yeoman-generator');
var GithubValidator = require('./GithubValidator');

let sourceRepo = "";
let targetRepos = [];

module.exports = class extends Generator {
  async prompting () {
    const sourceRepoAnswer = await this.prompt([
      {
        type: 'input',
        name: 'sourceRepo',
        message: 'Enter the source repository for labels.'
      }
    ])
    this.sourceRepo = GithubValidator.validateRepoUrl(sourceRepoAnswer.sourceRepo);

    var moreInput = true;
    while (moreInput) {
      const targetRepoAnswer = await this.prompt([
          {
              type: 'input',
              name: 'targetRepo',
              message: 'Enter the target repositories for label transfer, enter nothing to end entry.',
          }
      ]);

      if (targetRepoAnswer.targetRepo) {
        const targetRepo = GithubValidator.validateRepoUrl(targetRepoAnswer.targetRepo);
        targetRepos.push(targetRepo);
      } else {
        moreInput = false;
      }
    }

    const githubClient = new GithubClient();
    const labelsResult = await githubClient.getLabels(this.sourceRepo);

    const labelOptions = labelsResult.body.map(labelOption => labelOption.name);
    this.labelAnswer = await this.prompt([
      {
        type: 'checkbox',
        name: 'labels',
        message: 'Which labels do you want to copy?',
        choices: labelOptions
      }
    ])

    this.labelsToCopy = labelsResult.body.filter(
      labelOption => this.labelAnswer.labels.includes(labelOption.name)
    );

    this.log('Source repo: ');
    this.log(this.sourceRepo);
    this.log('Target repos: ', targetRepos);
    this.log('Labels to copy: ', this.labelAnswer.labels);
    this.log('Labels to copy2: ', this.labelsToCopy);
  }

  copyLabels () {
    const githubClient = new GithubClient();
    
    this.log('Target repos: ', targetRepos);

    for (let targetRepo in targetRepos) {
      this.log('Performing updates on ', targetRepo);
      githubClient.getLabels(targetRepo).then(
        targetLabelsResp => {
          for (let labelToCopy in this.labelsToCopy) {
            const existingLabel = targetLabelsResp.body.find(labelResp => labelResp.name == labelToCopy);
            if (!existingLabel) {
              // create
              githubClient.createLabel(labelToCopy);
            } else if (existingLabel.color != labelToCopy.color || existingLabel.description != labelToCopy.description) {
              // update
              githubClient.updateLabel(labelToCopy);
            } else {
              // no update
              this.log("Nothing to update for ", existingLabel.name);
            }
          }
        }
      );
    }
  }

  inputSourceRepo () {
  }

  inputTargetRepos () {

  }

  selectSourceLabels () {

  }

  executeLabelCopy () {

  }
}
