require('dotenv').config();
const Generator = require('yeoman-generator');
const GithubClient = require('./GithubClient.js');
const GithubValidator = require('./GithubValidator');
const LabelTransferService = require('./LabelTransferService');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.sourceRepo = {};
    this.targetRepos = [];
    this.labelsToCopy = [];
  }

  async prompting () {
    const sourceRepoAnswer = await this.prompt([
      {
        type: 'input',
        name: 'sourceRepo',
        message: 'Enter the source repository for labels.'
      }
    ])
    this.sourceRepo = GithubValidator.validateRepoUrl(sourceRepoAnswer.sourceRepo);

    let moreInput = true;
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
        this.targetRepos.push(targetRepo);
      } else {
        moreInput = false;
      }
    }

    const labelsResult = await GithubClient.getLabels(this.sourceRepo);

    const labelOptions = labelsResult && labelsResult.body && labelsResult.body.map(labelOption => labelOption.name);
    const labelAnswer = await this.prompt([
      {
        type: 'checkbox',
        name: 'labels',
        message: 'Which labels do you want to copy?',
        choices: labelOptions
      }
    ])

    this.labelsToCopy = labelsResult.body.filter(
      labelOption => labelAnswer.labels.includes(labelOption.name)
    );
  }

  copyLabels () {
    LabelTransferService.copyLabels(this.targetRepos, this.labelsToCopy);
  }
}
