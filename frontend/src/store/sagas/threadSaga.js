import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';
import ThreadService from '../../services/threadService';


export function* getThreadListSaga(action) {
  yield put(actions.getThreadListStart());

  const {page, tagIds, doctorId} = action;
  try {
    const response = yield ThreadService.getThreadList(page, tagIds, doctorId);
    yield put(actions.getThreadListSuccess(response.threads));
  } catch (error) {
    yield put(actions.getThreadListFail(error));
  }
}