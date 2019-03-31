import { put } from 'redux-saga/effects';

import SearchService from '../../services/searchService';
import * as actions from '../actions/index';

export function* searchAllSaga(action) {
  const { query, mode } = action;
  yield put(actions.searchStart(mode));
  try {
    const response = yield SearchService.searchAll(query);
    yield put(actions.searchSuccess(response));
  } catch (error) {
    yield put(actions.searchFailure(error));
  }
}
