import queryString from 'query-string';

import ApiService from './Api';
import { BASE_URL, GET_TAG_LIST } from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const tagService = {};

tagService.getTagList = (keyword='') => {
  const url = `${GET_TAG_LIST}?keyword=${keyword}`;
  return client.get(url);
};

export default tagService;