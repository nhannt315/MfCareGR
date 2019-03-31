const axios = require('axios');

module.exports = baseURL => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
};
