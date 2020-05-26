'use strict'

const superagent = require('superagent')

const githubPersonalAccessToken = 'doot'

module.exports = class GithubClient {
  constructor () {
  }

  getLabels(url) {
    const api = `${this.baseUrl(url.baseUrl)}/repos/${url.owner}/${url.repo}/labels`;
    return superagent.get(api)
      .set('Accept', 'application/json')
      .set('Authorization', `token ${githubPersonalAccessToken}`)
      .catch(err => console.log(err.response));
  }

  createLabel(label) {
    const api = `${this.baseUrl(url.baseUrl)}/repos/${url.owner}/${url.repo}/labels`;
    return superagent.post(api)
      .set('Accept', 'application/json')
      .set('Authorization', `token ${githubPersonalAccessToken}`)
      .send({
        name: label.name,
        color: label.color,
        description: label.description
      })
      .catch(err => console.log(err.response));
  }

  updateLabel(labelUpdate) {
    const api = `${this.baseUrl(url.baseUrl)}/repos/${url.owner}/${url.repo}/labels/${labelUpdate.name}`;
    return superagent.patch(api)
      .set('Accept', 'application/json')
      .set('Authorization', `token ${githubPersonalAccessToken}`)
      .send({
        //new_name: labelUpdate.name,
        color: labelUpdate.color,
        description: labelUpdate.description
      })
      .catch(err => console.log(err.response));
  }

  baseUrl(url) {
    return `${url}/api/v3`;
  }
}
