// import queryString from 'query-string';

import ApiService from './Api';
import { BASE_URL, SEARCH_ALL } from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const searchService = {};

searchService.searchAll = (query) => client.get(`${SEARCH_ALL}?q=${query}`);

export default searchService;
