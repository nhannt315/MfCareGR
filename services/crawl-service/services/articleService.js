const axios = require('axios');
const ARTICLE_SERVICE_URL = 'http://article-app:3000';
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
const TIMEOUT = 10000;

const client = axios.create({
  baseURL: ARTICLE_SERVICE_URL,
  timeout: TIMEOUT,
  headers: HEADERS,
});

const getLatestPublishedDate = () => {
  return client.get('/articles/get_latest_date');
};

const getArticleVicare = () => {
  return new Promise((resolve, reject) => {
    axios.get('https://vicare.vn/api/v1/cms_posts/')
      .then(response => {
        return resolve(response.data);
      })
      .catch(error => {
        return reject(error.message);
      })
  })
};

module.exports = {
  getLatestPublishedDate,
  getArticleVicare
};