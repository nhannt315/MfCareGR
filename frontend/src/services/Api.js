import axios from 'axios';

// Default API will be your root
const API_ROOT = process.env.URL || 'http://localhost:4000/';
const TIMEOUT = 20000;
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

class ApiService {
  constructor({
                baseURL = API_ROOT,
                timeout = TIMEOUT,
                headers = HEADERS,
                auth
              }) {
    const client = axios.create({
      baseURL,
      timeout,
      headers,
      auth
    });

    client.interceptors.response.use(this.handleSuccess, this.handleError);
    this.client = client;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error);
  }

  get(path) {
    return this.client.get(path).then(response => response.data);
  }

  post(path, payload, headers) {
    return this.client.post(path, payload, {headers: headers}).then(response => response.data);
  }

  put(path, payload, headers) {
    return this.client.put(path, payload, {headers: headers}).then(response => response.data);
  }

  patch(path, payload) {
    return this.client.patch(path, payload).then(response => response.data);
  }

  delete(path, headers) {
    return this.client.delete(path, {headers: headers}).then(response => response.data);
  }
}

export default ApiService;
