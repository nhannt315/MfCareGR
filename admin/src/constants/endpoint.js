import queryString from 'query-string';

// export const BASE_URL = 'http://192.168.1.20:4000';
export const BASE_URL = 'http://api-gate-way:4000';


export const LOGIN = '/auth/login';
export const GET_USER_INFO = '/get_user_info';
export const SIGNUP = '/signup';

export const DOCTOR_LIST = '/doctors/admin_doctor_list';
export const doctorDetail = id => `/doctors/${id}/admin_doctor_detail`;
export const approveDoctor = id => `/doctors/${id}/approve`;
export const declineDoctor = id => `/doctors/${id}/decline`;
export const GET_FILTER_DATA = '/filter_data';
export const updateDoctor = id => `/doctors/${id}`;

export const getRecentCrawledArticle = (page, perPage = 10) => {
  return `/articles/get_recent_crawled?page=${page}&item_per_page=${perPage}`;
};
