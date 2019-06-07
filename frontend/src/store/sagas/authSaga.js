// import 'regenerator-runtime/runtime';
import { put } from 'redux-saga/effects';

import AuthService from '../../services/authService';
import TagService from '../../services/tagService';
import * as keys from '../../constants/key';
import * as actions from '../actions/index';

export function* logoutSaga() {
  yield localStorage.removeItem(keys.USER_DATA_LOCAL_KEY);
  yield localStorage.removeItem(keys.TOKEN_DATA_LOCAL_KEY);
  yield put(actions.logoutSuccess());
}

export function* loginSaga(action) {
  yield put(actions.startProcess());
  const {email, password, remember} = action;

  try {
    const response = yield AuthService.authenticate(email, password);
    const token = response.auth_token;
    const userData = response.user_data;

    if (remember) {
      yield localStorage.setItem(keys.TOKEN_DATA_LOCAL_KEY, JSON.stringify(token));
      yield localStorage.setItem(keys.USER_DATA_LOCAL_KEY, JSON.stringify(userData));
    }
    yield put(actions.loginSuccess(userData, token));
    // yield put(actions.getTagDetailUser(userData.tags));
    yield put(actions.finishProcess());
  } catch (errors) {
    yield put(actions.finishProcess());
    yield put(actions.loginFailure(errors));
  }
}

export function* authCheckStateSaga() {
  const userData = JSON.parse(localStorage.getItem(keys.USER_DATA_LOCAL_KEY));
  const tokenData = JSON.parse(localStorage.getItem(keys.TOKEN_DATA_LOCAL_KEY));
  if (!tokenData) {
    yield put(actions.logout());
    return;
  }
  yield put(actions.loginSuccess(userData, tokenData));
  try {
    const response = yield AuthService.getUserInfo(tokenData);
    yield put(actions.loginSuccess(response, tokenData));
  } catch (error) {
    yield put(actions.logout());
  }
}

export function* signUpSaga(action) {
  yield put(actions.startProcess());
  const data = {
    email: action.email,
    name: action.name,
    password: action.password,
    passwordConfirm: action.passwordConfirm,
    phoneNumber: action.phoneNumber
  };
  try {
    const {user_data, token} = yield AuthService.signup(data);
    yield put(actions.signUpSuccess(user_data, token));
    yield localStorage.setItem(keys.TOKEN_DATA_LOCAL_KEY, JSON.stringify(token));
    yield localStorage.setItem(keys.USER_DATA_LOCAL_KEY, JSON.stringify(user_data));
    yield put(actions.finishProcess());
  } catch (error) {
    yield put(actions.finishProcess());
    yield put(actions.signUpFailure(error.response));
  }
}

export function* getTagDetailUser(action) {
  const {tagIds} = action;

  try {
    const response = yield TagService.getTagByIds(tagIds);
    yield put(actions.getTagDetailUserSuccess(response));
  } catch (error) {
    console.log(error);
  }
}