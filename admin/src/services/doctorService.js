import ApiService from './Api';
import qs from 'query-string';
import {
  BASE_URL,
  DOCTOR_LIST,
  GET_FILTER_DATA,
  doctorDetail,
  approveDoctor,
  declineDoctor,
  updateDoctor
} from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const doctorService = {};

doctorService.getList = (page, perPage, token, mode, query) => {
  return client.get(`${DOCTOR_LIST}?page=${page}&per_page=${perPage}&mode=${mode}&keyword=${query}`, token);
};

doctorService.updateDoctor = (doctorId, token, payload) => {
  return client.put(updateDoctor(doctorId), payload, token);
};

doctorService.getDoctorDetail = (id, token) => {
  return client.get(doctorDetail(id), token);
};

doctorService.approveDoctor = (id, token) => {
  return client.post(approveDoctor(id), {}, token);
};

doctorService.declineDoctor = (id, token) => {
  return client.post(declineDoctor(id), {}, token);
};

doctorService.getFilterData = () => client.get(GET_FILTER_DATA);

export default doctorService;