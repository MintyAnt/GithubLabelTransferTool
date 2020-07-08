require('dotenv').config();
const Generator = require('yeoman-generator');
const GithubClient = require('./GithubClient.js');
const GithubValidator = require('./GithubValidator');

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

    console.log('Source repo: ');
    console.log(this.sourceRepo);
    console.log('Target repos: ', this.targetRepos);
    console.log('Labels to copy: ', labelAnswer.labels);
    console.log('Labels to copy2: ', this.labelsToCopy);
  }

  copyLabels () {
    console.log('Target repos: ', this.targetRepos);

    for (const targetRepo of this.targetRepos) {
      console.log('Performing updates on ', targetRepo);
      GithubClient.getLabels(targetRepo).then(
        targetLabelsResp => {
          for (const labelToCopy of this.labelsToCopy) {
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
