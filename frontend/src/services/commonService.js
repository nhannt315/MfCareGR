import ApiService from './Api';
import { BASE_URL, GET_LOOKUP_DATA } from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const commonService = {};

commonService.getLookupData = () => client.get(GET_LOOKUP_DATA);

export default commonService;