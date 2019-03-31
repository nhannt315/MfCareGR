import ApiService from './Api';
import { BASE_URL, GET_DOCTORS, GET_SPECIALITIES, GET_FILTER_DATA } from '../constants/endpoint';
import queryString from 'querystring';

const client = new ApiService({ baseURL: BASE_URL });

const doctorService = {};

doctorService.getDoctors = (page, perPage, config) => {
  console.log('url', queryString.stringify(config));
  const url = `${GET_DOCTORS}?page=${page}&item_per_page=${perPage}&${queryString.stringify(
    config
  )}`;
  return client.get(url);
};

doctorService.getSpecialities = () => client.get(GET_SPECIALITIES);
doctorService.getFilterData = () => client.get(GET_FILTER_DATA);

export default doctorService;
