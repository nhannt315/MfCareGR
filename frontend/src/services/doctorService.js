import ApiService from './Api';
import { BASE_URL, GET_DOCTORS, GET_SPECIALITIES, GET_FILTER_DATA, getDoctorDetail } from '../constants/endpoint';
import queryString from 'query-string';

const client = new ApiService({baseURL: BASE_URL});

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
doctorService.getDoctorDetail = slug => client.get(getDoctorDetail(slug));
doctorService.registerDoctor = payload => client.post('/doctors', payload);

export default doctorService;
