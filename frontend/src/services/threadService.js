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
  like,
  getThreadDetail
} from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const threadService = {};

threadService.getThreadList = (page, tagIds, doctorId, mode) => client.get(getThreadList(page, tagIds, doctorId, mode));
threadService.getCommentList = threadSlug => client.get(getCommentList(threadSlug));
threadService.createComment = (threadId, hidingCreator, postContent, token) => {
  let payload = {
    thread_id: threadId,
    content: postContent,
    hiding_creator: hidingCreator
  };
  return client.post(CREATE_COMMENT, payload, token);
};
threadService.updateComment = (postId, hidingCreator, content, token) => {
  let payload = {
    hiding_creator: hidingCreator,
    content: content
  };
  return client.put(updateComment(postId), payload, token);
};
threadService.deleteComment = (postId, token) => {
  return client.delete(deleteComment(postId), token);
};

threadService.createThread = (hidingCreator, content, token, doctorId) => {
  let payload = {
    hiding_creator: hidingCreator,
    content: content,
    doctor_id: doctorId
  };
  return client.post(CREATE_THREAD, payload, token);
};

threadService.getThreadDetail = idOrSlug => {
  return client.get(getThreadDetail(idOrSlug));
};

threadService.updateThread = (threadId, content, hidingCreator, token) => {
  let payload = {
    content: content,
    hidingCreator: hidingCreator
  };
  return client.put(updateThread(threadId), payload, token);
};

threadService.addRemoveTag = (action, threadId, tagId, token) => {
  let payload = {
    action_tag: action,
    thread_id: threadId,
    tag_id: tagId
  };
  return client.post('/tag', payload, token);
};

threadService.likePost = (postId, token) => {
  let payload = {
    post_id: postId
  };
  return client.post('/like', payload, token);
};

threadService.dislikePost = (postId, token) => {
  return client.delete(like(postId), token);
};

export default threadService;