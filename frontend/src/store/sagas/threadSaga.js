import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';
import ThreadService from '../../services/threadService';


export function* getThreadListSaga(action) {
  yield put(actions.getThreadListStart());

  const {page, tagIds, doctorId, mode} = action;
  try {
    const response = yield ThreadService.getThreadList(page, tagIds, doctorId, mode);
    yield put(actions.getThreadListSuccess(response.threads, response.has_more, response.total));
  } catch (error) {
    yield put(actions.getThreadListFail(error));
  }
}