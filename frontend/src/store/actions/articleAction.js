import * as actionTypes from './actionTypes';

export const fetchArticle = (page, tagIds = []) => {
  return {
    type: actionTypes.FETCH_ARTICLE,
    page: page,
    tagIds: tagIds
  };
};

export const fetchArticleStart = () => {
  return {
    type: actionTypes.FETCH_ARTICLE_START
  };
};

export const fetchArticleSuccess = (articles, hasMore, total) => {
  return {
    type: actionTypes.FETCH_ARTICLE_SUCCESS,
    articles: articles,
    hasMore: hasMore,
    total: total
  };
};

export const fetchArticleFailure = errors => {
  return {
    type: actionTypes.FETCH_ARTICLE_FAILURE,
    errors: errors
  };
};

export const clearArticle = () => {
  return {
    type: actionTypes.CLEAR_ARTICLE
  };
};