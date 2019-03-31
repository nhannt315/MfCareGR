import * as actionTypes from '../actions/actionTypes';

const initialState = {
  threadList: [],
  isFetchingList: false,
  error: null,
  page: 1
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_THREAD_LIST:
      return addToThreadList(state, action);
    case actionTypes.UPDATE_THREAD_LIST:
      return updateThreadList(state, action);
    case actionTypes.UPDATE_TAG_THREAD:
      return updateThreadTag(state, action);
    case actionTypes.UPDATE_LIKE_STATUS:
      return updateLikeStatus(state, action);
    case actionTypes.GET_THREAD_LIST_START:
      return {...state, isFetchingList: true, error: null};
    case actionTypes.GET_THREAD_LIST_SUCCESS:
      return {
        ...state,
        isFetchingList: false,
        threadList: state.threadList.concat(action.threadList),
        page: state.page + 1
      };
    case actionTypes.GET_THREAD_LIST_FAIL:
      return {...state, isFetchingList: false, error: action.error};
    default:
      return state;
  }
};

const updateLikeStatus = (state, {action, threadId, userId}) => {
  const threadList = state.threadList;
  const threadIndex = threadList.findIndex(obj => obj.id === threadId);
  let oldLikeArray = threadList[threadIndex].question.likes;
  if (action === 'add') {
    oldLikeArray.push(userId);
  } else if (action === 'remove') {
    let index = oldLikeArray.indexOf(userId);
    if (index > -1) {
      oldLikeArray.splice(index, 1);
    }
  }
  const newThread = {...threadList[threadIndex], question: {...threadList[threadIndex].question, likes: oldLikeArray}};
  const updatedThreadList = [
    ...threadList.slice(0, threadIndex),
    newThread,
    ...threadList.slice(threadIndex + 1)
  ];
  return {...state, threadList: updatedThreadList};
};

const addToThreadList = (state, action) => {
  let newList = JSON.parse(JSON.stringify(state.threadList));
  newList.unshift(action.thread);
  return {...state, threadList: newList};
};

const updateThreadTag = (state, {threadId, tag, action}) => {
  const threadList = state.threadList;
  const threadIndex = threadList.findIndex(obj => obj.id === threadId);
  let oldTags = threadList[threadIndex].tags;
  if (action === 'add') {
    oldTags.push(tag);
    const newTags = JSON.parse(JSON.stringify(oldTags));
    const newThread = {...threadList[threadIndex], tags: newTags};
    const updatedThreadList = [
      ...threadList.slice(0, threadIndex),
      newThread,
      ...threadList.slice(threadIndex + 1)
    ];
    return {...state, threadList: updatedThreadList};
  } else if (action === 'remove') {
    const tagIndex = oldTags.findIndex(obj => obj.id === tag.id);
    oldTags.splice(tagIndex, 1);
    const newTags = JSON.parse(JSON.stringify(oldTags));
    const newThread = {...threadList[threadIndex], tags: newTags};
    const updatedThreadList = [
      ...threadList.slice(0, threadIndex),
      newThread,
      ...threadList.slice(threadIndex + 1)
    ];
    return {...state, threadList: updatedThreadList};
  }
  return {...state};
};

const updateThreadList = (state, action) => {
  const threadList = state.threadList;
  const threadIndex = threadList.findIndex(obj => obj.id === action.thread.id);
  const updatedThreadList = [
    ...threadList.slice(0, threadIndex),
    action.thread,
    ...threadList.slice(threadIndex + 1),
  ];
  return {...state, threadList: updatedThreadList};
};
export default reducer;