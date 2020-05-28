const superagent = require('superagent');

const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const GITHUB_API_URL = '/api/v3';
const GITHUB_API_VERSION = 'application/vnd.github.v3+json';

const getLabels = (url) => {
    const api = `${url.host}${GITHUB_API_URL}/repos/${url.owner}/${url.repo}/labels`;
    return superagent.get(api)
      .set('Accept', GITHUB_API_VERSION)
      .set('User-Agent', 'superagent')
      .set('Authorization', `token ${GITHUB_TOKEN}`)
      .catch(err => console.log(err));
  };

const createLabel = (url, label) => {
    const api = `${url.host}${GITHUB_API_URL}/repos/${url.owner}/${url.repo}/labels`;
    return superagent.post(api)
      .set('Accept', GITHUB_API_VERSION)
      .set('User-Agent', 'superagent')
      .set('Authorization', `token ${GITHUB_TOKEN}`)
      .send({
        name: label.name,
        color: label.color,
        description: label.description
      })
      .catch(err => console.log(err));
  };

const updateLabel = (url, labelUpdate) => {
    const api = `${url.host}${GITHUB_API_URL}/repos/${url.owner}/${url.repo}/labels/${labelUpdate.name}`;
    return superagent.patch(api)
      .set('Accept', GITHUB_API_VERSION)
      .set('User-Agent', 'superagent')
      .set('Authorization', `token ${GITHUB_TOKEN}`)
      .send({
        //new_name: labelUpdate.name,
        color: labelUpdate.color,
        description: labelUpdate.description
      })
      .catch(err => console.log(err));
  };

module.exports = {
  getLabels,
  createLabel,
  updateLabel,
}
