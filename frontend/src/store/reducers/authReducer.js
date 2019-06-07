import * as actionTypes from '../actions/actionTypes';
import { USER_DATA_LOCAL_KEY } from '../../constants/key';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  userData: {},
  tokenData: '',
  errors: null,
  isFetching: true,
  isUpdating: false,
  updated: false,
  userInfo: {},
  isProcessing: false,
  tags: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_PROCESSING:
      return {...state, isProcessing: true, errors: null};
    case actionTypes.FINISH_PROCESSING:
      return {...state, isProcessing: false};
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        tokenData: action.tokenData,
        isAuthenticated: true,
        isAdmin: action.userData.is_staff
      };
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.SIGN_UP_FAILURE:
      return {...state, errors: action.errors};
    case actionTypes.LOGOUT_SUCCESS:
    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        userData: {},
        tokenData: '',
        errors: []
      };
    case actionTypes.AUTH_FORGOT_PASSWORD_COMPLETE:
      return {...state, status: action.status, errors: []};
    case actionTypes.AUTH_RESET_PASSWORD_COMPLETE:
      return {...state, status: action.status, errors: []};
    case actionTypes.GET_USER_PROFILE_INFO:
      return {...state, isFetching: true};
    case actionTypes.GET_USER_PROFILE_INFO_SUCCESS:
      return {...state, isFetching: false, userInfo: action.userInfo};
    case actionTypes.GET_USER_PROFILE_INFO_FAILUE:
      return {...state, isFetching: false, errors: action.errors};
    case actionTypes.PATH_UPDATE_PROFILE:
      return {...state, isUpdating: true};
    case actionTypes.PATH_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        userInfo: action.userInfo,
        updated: true,
        userData: action.userData,
        tokenData: action.tokenData
      };
    case actionTypes.PATH_UPDATE_PROFILE_FAILUE:
      return {...state, isUpdating: false, errors: action.errors};
    case actionTypes.ADD_REMOVE_TAG_USER:
      return addRemoveTagUser(state, action);
    case actionTypes.GET_TAG_DETAIL_USER_SUCCESS:
      return {...state, tags: action.tags};
    case actionTypes.ADD_REMOVE_FOLLOW_USER:
      return addRemoveFollowUser(state, action);
    case actionTypes.UPDATE_USER_DATA:
      return {...state, userData: action.userData};
    default:
      return state;
  }
};

const addRemoveTagUser = (state, {tagId, action}) => {
  const oldTag = state.userData.tags;
  let newTag = JSON.parse(JSON.stringify(oldTag));
  if (action === 'add') {
    newTag.push(tagId);
  } else if (action === 'remove') {
    const tagIndex = oldTag.findIndex(obj => obj.id === tagId);
    newTag.splice(tagIndex, 1);
  }
  localStorage.setItem(USER_DATA_LOCAL_KEY, JSON.stringify({...state.userData, tags: newTag}));
  return {...state, userData: {...state.userData, tags: newTag}};
};

const addRemoveFollowUser = (state, {userId, action}) => {
  const oldUserList = state.userData.following;
  let newList = JSON.parse(JSON.stringify(oldUserList));
  if (action === 'add') {
    newList.push(userId);
  } else if (action === 'remove') {
    const tagIndex = oldUserList.findIndex(obj => obj.id === userId);
    newList.splice(tagIndex, 1);
  }
  localStorage.setItem(USER_DATA_LOCAL_KEY, JSON.stringify({...state.userData, following: newList}));
  return {...state, userData: {...state.userData, following: newList}};
};

export default reducer;
