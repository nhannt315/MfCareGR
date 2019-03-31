// import 'regenerator-runtime/runtime';
import { put } from 'redux-saga/effects';

import AuthService from '../../services/authService';
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
    yield put(actions.finishProcess());
  } catch (errors) {
    yield put(actions.finishProcess());
    yield put(actions.loginFailure(errors));
  }
}

export function* authCheckStateSaga() {
  const userData = JSON.parse(localStorage.getItem(keys.USER_DATA_LOCAL_KEY));
  const tokenData = JSON.parse(localStorage.getItem(keys.TOKEN_DATA_LOCAL_KEY));
  if(userData && tokenData){
    yield put(actions.loginSuccess(userData, tokenData));
  }
}