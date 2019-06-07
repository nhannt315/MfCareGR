const axios = require('axios');
const queryString = require('query-string');
const USER_SERVICE_URL = 'http://user-app:3000';
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
const TIMEOUT = 40000;

const client = axios.create({
  baseURL: USER_SERVICE_URL,
  timeout: TIMEOUT,
  headers: HEADERS,
});
const getUserById = (userId) => {
  const payload = {
    user_ids: [userId]
  };
  return client.get(`/users/get_users_by_ids?${queryString.stringify(payload, {arrayFormat: 'bracket'})}`);
};

const authenticate = token => {
  return client.get('/get_user_info', {headers: {'Authorization': token}});
};

module.exports = {
  getUserById,
  authenticate
};