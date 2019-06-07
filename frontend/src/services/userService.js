import ApiService from './Api';
import {
  BASE_URL,
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_PROVINCES
} from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const userService = {};

userService.followUser = (token, userId) => {
  const payload = {
    user_id: userId
  };
  return client.post(FOLLOW_USER, payload, token);
};

userService.unfollowUser = (token, userId) => {
  const payload = {
    user_id: userId
  };
  return client.post(UNFOLLOW_USER, payload, token);
};

userService.getProvinces = () => client.get(GET_PROVINCES);

userService.updateInfo = (userId, token, payload) => {
  return client.put(`/users/${userId}`, payload, token);
};

userService.changePassword = (token, payload) => {
  return client.put('/change_password', payload, token);
};

export default userService;