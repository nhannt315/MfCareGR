import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';
import ThreadService from '../../services/threadService';


export function* getThreadListSaga(action) {
  yield put(actions.getThreadListStart());

  const {page, tagIds} = action;
  try {
    const response = yield ThreadService.getThreadList(page, tagIds);
    yield put(actions.getThreadListSuccess(response.threads));
  } catch (error) {
    yield put(actions.getThreadListFail(error));
  }
}