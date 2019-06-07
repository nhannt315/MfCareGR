import * as actionTypes from '../actions/actionTypes';

const initialState = {
  articles: [],
  articleLoading: false,
  errors: null,
  page: 1,
  hasMore: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ARTICLE_START:
      return {...state, articleLoading: true, articles: [], errors: null};
    case actionTypes.FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        articleLoading: false,
        articles: action.articles,
        hasMore: action.hasMore,
        page: state.page + 1
      };
    case actionTypes.FETCH_ARTICLE_FAILURE:
      return {...state, articleLoading: false, errors: action.errors};
    case actionTypes.CLEAR_ARTICLE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
