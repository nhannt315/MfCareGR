import * as actionTypes from './actionTypes';


export const getThreadList = (page, tagIds) => {
  return {
    type: actionTypes.GET_THREAD_LIST,
    page: page,
    tagIds: tagIds
  };
};


export const getThreadListStart = () => {
  return {
    type: actionTypes.GET_THREAD_LIST_START
  };
};

export const getThreadListFail = error => {
  return {
    type: actionTypes.GET_THREAD_LIST_FAIL,
    error: error
  };
};

export const getThreadListSuccess = threads => {
  return {
    type: actionTypes.GET_THREAD_LIST_SUCCESS,
    threadList: threads
  };
};

export const addToThreadList = (thread) => {
  return {
    type: actionTypes.ADD_TO_THREAD_LIST,
    thread: thread
  };
};

export const updateThreadList = (thread) => {
  return {
    type: actionTypes.UPDATE_THREAD_LIST,
    thread: thread
  };
};

export const updateTagThread = (action, threadId, tag) => {
  return {
    type: actionTypes.UPDATE_TAG_THREAD,
    threadId: threadId,
    tag: tag,
    action: action
  };
};

export const updateLikeStatus = (action, threadId, userId) => {
  return {
    type: actionTypes.UPDATE_LIKE_STATUS,
    action: action,
    threadId: threadId,
    userId: userId
  };
};