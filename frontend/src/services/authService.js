import ApiService from './Api';
import { BASE_URL, LOGIN } from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const authService = {};

authService.authenticate = (email, password) => client.post(LOGIN, {email: email, password: password});

export default authService;