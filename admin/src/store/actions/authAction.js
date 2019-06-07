import * as actionTypes from './actionTypes';

export const login = (email, password, remember) => {
  return {
    type: actionTypes.LOGIN,
    email: email,
    password: password,
    remember: remember
  };
};

export const loginSuccess = (userData, tokenData) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    userData: userData,
    tokenData: tokenData
  };
};

export const loginFailure = errors => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    errors: errors
  };
};

export const signUp = (email, name, password, passwordConfirm, phoneNUmber) => {
  return {
    type: actionTypes.SIGN_UP,
    email: email,
    name: name,
    password: password,
    passwordConfirm: passwordConfirm,
    phoneNUmber: phoneNUmber
  };
};

export const signUpSuccess = (userData, tokenData) => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    userData: userData,
    tokenData: tokenData
  };
};

export const signUpFailure = errors => {
  return {
    type: actionTypes.SIGN_UP_FAILURE,
    errors: errors
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  };
};

export const logoutFail = () => {
  return {
    type: actionTypes.LOGOUT_FAILURE
  };
};

export const forgotPassword = (email, redirect) => {
  return {
    type: actionTypes.AUTH_FORGOT_PASSWORD,
    email: email,
    redirect: redirect
  };
};

export const forgotPasswordComplete = (status) => {
  return {
    type: actionTypes.AUTH_FORGOT_PASSWORD_COMPLETE,
    status: status
  };
};

export const resetPassword = (password, passwordConfirm, data) => {
  return {
    type: actionTypes.AUTH_RESET_PASSWORD,
    password: password,
    passwordConfirm: passwordConfirm,
    data: data
  };
};

export const resetPasswordComplete = (status) => {
  return {
    type: actionTypes.AUTH_RESET_PASSWORD_COMPLETE,
    status: status
  };
};

export const startProcess = () => {
  return {
    type: actionTypes.START_PROCESSING
  };
};

export const finishProcess = () => {
  return {
    type: actionTypes.FINISH_PROCESSING
  };
};

export const errorProcess = errors => {
  return {
    type: actionTypes.ERROR_PROCESSING,
    errors: errors
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};

export const getProfile = (id, owner) => {
  return {
    type: actionTypes.GET_USER_PROFILE_INFO,
    id: id,
    isOwner: owner
  };
};

export const getProfileSuccess = (userInfo) => {
  return {
    type: actionTypes.GET_USER_PROFILE_INFO_SUCCESS,
    userInfo: userInfo
  };
};

export const getProfileFailue = (errors) => {
  return {
    type: actionTypes.GET_USER_PROFILE_INFO_FAILUE,
    errors: errors
  };
};

export const updateProfile = (id, name, email) => {
  return {
    type: actionTypes.PATH_UPDATE_PROFILE,
    id: id,
    name: name,
    email: email
  };
};

export const updateProfileSuccess = (userInfo, userData, tokenData) => {
  return {
    type: actionTypes.PATH_UPDATE_PROFILE_SUCCESS,
    userInfo: userInfo,
    userData: userData,
    tokenData: tokenData
  };
};

export const updateProfileFailue = (errors) => {
  return {
    type: actionTypes.PATH_UPDATE_PROFILE_FAILUE,
    errors: errors
  };
};

export const addRemoveTagUser = (tagId, action) => {
  return {
    type: actionTypes.ADD_REMOVE_TAG_USER,
    tagId: tagId,
    action: action
  };
};

export const addRemoveFollowUser = (userId, action) => {
  return {
    type: actionTypes.ADD_REMOVE_FOLLOW_USER,
    userId: userId,
    action: action
  };
};

export const getTagDetailUser = (tagIds = []) => {
  return {
    type: actionTypes.GET_TAG_DETAIL_USER,
    tagIds: tagIds
  };
};


export const getTagDetailUserSuccess = (tags) => {
  return {
    type: actionTypes.GET_TAG_DETAIL_USER_SUCCESS,
    tags: tags
  };
};

export const updateUserData = userData => {
  return {
    type: actionTypes.UPDATE_USER_DATA,
    userData: userData
  };
};
