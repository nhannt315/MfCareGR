import { all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {
  loginSaga,
  logoutSaga,
  authCheckStateSaga
} from './authSaga';

import {
  getThreadListSaga
} from './threadSaga';

import {
  searchAllSaga
} from './searchSaga';

export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.LOGIN, loginSaga),
    takeLatest(actionTypes.LOGOUT, logoutSaga),
    takeLatest(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

export function* watchThread() {
  yield all([
    takeLatest(actionTypes.GET_THREAD_LIST, getThreadListSaga)
  ]);
}

export function* watchSearch() {
  yield all([
    takeLatest(actionTypes.SEARCH_ALL, searchAllSaga)
  ]);
}
