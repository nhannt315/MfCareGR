import ApiService from './Api';
import { BASE_URL, LOGIN, GET_USER_INFO, SIGNUP } from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const authService = {};

authService.authenticate = (email, password) => client.post(LOGIN, {email: email, password: password});
authService.getUserInfo = (token) => client.get(GET_USER_INFO, token);
authService.signup = ({name, email, password, passwordConfirm, phoneNumber}) => {
  let payload = {
    name: name,
    email: email,
    password: password,
    password_confirmation: passwordConfirm,
    phoneNumber: phoneNumber
  };
  return client.post(SIGNUP, payload);
};

export default authService;