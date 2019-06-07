import ApiService from './Api';
import queryString from 'query-string';
import {
  BASE_URL,
  GET_TAG_LIST,
  SEARCH_TAG,
  REMOVE_USER_TAG,
  ADD_USER_TAG,
  GET_TAG_BY_IDS
} from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const tagService = {};

tagService.getTagList = (keyword = '') => {
  const url = `${GET_TAG_LIST}?keyword=${keyword}`;
  return client.get(url);
};

tagService.searchTag = (keyword = '') => {
  const url = `${SEARCH_TAG}?keyword=${keyword}`;
  return client.get(url);
};

tagService.removeUserTag = (tagId, token) => {
  let payload = {
    tag_id: tagId
  };
  return client.post(REMOVE_USER_TAG, payload, token);
};

tagService.addUserTag = (tagId, token) => {
  let payload = {
    tag_id: tagId
  };
  return client.post(ADD_USER_TAG, payload, token);
};

tagService.getTagByIds = (tagIds = []) => {
  let payload = {
    tag_ids: tagIds,
    detail: true
  };
  const url = `${GET_TAG_BY_IDS}?${queryString.stringify(payload, {arrayFormat: 'bracket'})}`;
  return client.get(url);
};

tagService.getTagDetail = slug => {
  return client.get(`${GET_TAG_LIST}/${slug}`);
};

export default tagService;