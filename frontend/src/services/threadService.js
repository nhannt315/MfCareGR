import ApiService from './Api';

import {
  BASE_URL,
  getThreadList,
  getCommentList,
  CREATE_COMMENT,
  deleteComment,
  updateComment,
  CREATE_THREAD,
  updateThread,
  like
} from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const threadService = {};

threadService.getThreadList = (page, tagIds) => client.get(getThreadList(page, tagIds));
threadService.getCommentList = threadSlug => client.get(getCommentList(threadSlug));
threadService.createComment = (threadId, hidingCreator, postContent, token) => {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  };
  let payload = {
    thread_id: threadId,
    content: postContent,
    hiding_creator: hidingCreator
  };
  return client.post(CREATE_COMMENT, payload, headers);
};
threadService.updateComment = (postId, hidingCreator, content, token) => {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  };
  let payload = {
    hiding_creator: hidingCreator,
    content: content
  };
  return client.put(updateComment(postId), payload, headers);
};
threadService.deleteComment = (postId, token) => {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  };
  return client.delete(deleteComment(postId), headers);
};

threadService.createThread = (hidingCreator, content, token, doctorId) => {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  };
  let payload = {
    hiding_creator: hidingCreator,
    content: content,
    doctor_id: doctorId
  };
  return client.post(CREATE_THREAD, payload, headers);
};

threadService.updateThread = (threadId, content, hidingCreator, token) => {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  };
  let payload = {
    content: content,
    hidingCreator: hidingCreator
  };
  return client.put(updateThread(threadId), payload, headers);
};

threadService.addRemoveTag = (action, threadId, tagId, token) => {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  };
  let payload = {
    action_tag: action,
    thread_id: threadId,
    tag_id: tagId
  };
  return client.post('/tag', payload, headers);
};

threadService.likePost = (postId, token) => {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  };
  let payload = {
    post_id: postId
  };
  return client.post('/like', payload, headers);
};

threadService.dislikePost = (postId, token) => {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  };
  return client.delete(like(postId), headers);
};

export default threadService;