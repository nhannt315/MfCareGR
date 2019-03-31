import * as actionTypes from '../actions/actionTypes';

const initialState = {
  searchResult: null,
  isLoading: false,
  error: null,
  mode: 'navbar'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_START:
      return {
        ...state,
        isLoading: true,
        searchResult: null,
        error: null,
        mode: action.mode
      };
    case actionTypes.SEARCH_SUCCESS:
      return { ...state, isLoading: false, searchResult: action.data };
    case actionTypes.SEARCH_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    case actionTypes.CLEAR_SEARCH_RESULT:
      return { ...state, searchResult: null };
    default:
      return state;
  }
};

export default reducer;
