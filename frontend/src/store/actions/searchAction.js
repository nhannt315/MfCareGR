import * as actionTypes from './actionTypes';

export const searchAll = (query, mode = 'navbar') => {
  return {
    type: actionTypes.SEARCH_ALL,
    query: query,
    mode: mode
  };
};

export const searchStart = (mode = 'navbar') => {
  return {
    type: actionTypes.SEARCH_START,
    mode: mode
  };
};

export const searchSuccess = results => {
  return {
    type: actionTypes.SEARCH_SUCCESS,
    data: results
  };
};

export const searchFailure = error => {
  return {
    type: actionTypes.SEARCH_FAILURE,
    error: error
  };
};

export const clearSearchResult = () => {
  return {
    type: actionTypes.CLEAR_SEARCH_RESULT
  };
};
