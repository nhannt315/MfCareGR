import ApiService from './Api';
import { BASE_URL, GET_NOTIFICATIONS } from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const notificationService = {};

notificationService.getNotifications = token => {
  return client.get(GET_NOTIFICATIONS, token);
};

export default notificationService;
