import qs from 'query-string';

import ApiService from './Api';
import { BASE_URL, GET_LOOKUP_DATA, GET_ASK_DOCTOR_COUNT_DATA } from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const commonService = {};

commonService.getLookupData = () => client.get(GET_LOOKUP_DATA);
commonService.getCountData = (tagIds = []) => {
  const params = {
    tag_ids: tagIds
  };
  return client.get(`${GET_ASK_DOCTOR_COUNT_DATA}?${qs.stringify(params, {arrayFormat: 'bracket'})}`);
};

export default commonService;