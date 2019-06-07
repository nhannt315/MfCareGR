import { put } from 'redux-saga/effects';

import ArticleService from '../../services/articleService';
import * as actions from '../actions/index';

export function* fetchArticle(action) {
  const {page, tagIds} = action;
  yield put(actions.fetchArticleStart());
  try {
    const response = yield ArticleService.getArticles(page, 5, tagIds);
    yield put(actions.fetchArticleSuccess(response.articles, response.has_more, response.total));
  } catch (error) {
    yield put(actions.fetchArticleFailure(error));
  }
}