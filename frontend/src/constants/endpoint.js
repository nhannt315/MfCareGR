import queryString from 'query-string';

// export const BASE_URL = 'http://192.168.1.20:4000';
export const BASE_URL = 'http://localhost:4000';
// export const BASE_URL = 'http://api-gate-way:4000';
// export const NOTIFICATION_URL = 'http://notification-app:8080';
export const NOTIFICATION_URL = 'http://localhost:8080';

export const MEDICINE_CLASSES = '/medicine_classes';
export const getMedicineType = (slug, page) => `/medicine_types/${slug}?page=${page}`;
export const getMedicineList = (page) => `/medicines/?page=${page}`;
export const getMedicineDetail = (slug) => `/medicines/${slug}`;
export const getSameTypeMedicine = (slug) => `/medicines/${slug}/same_type`;
export const GET_DISEASES = '/diseases/';
export const getDiseaseDetail = (slug) => `/diseases/${slug}`;
export const MOST_VIEWED_DISEASES = '/diseases/most_viewed';

export const GET_TOP_ARTICLES = '/articles/get_top';
export const getArticleDetail = (slug) => `/articles/${slug}`;
export const getArticles = (page, perPage = 5, tagIds) => {
  let params = {
    page: page,
    item_per_page: perPage,
    tag_ids: tagIds
  };
  return `/articles?${queryString.stringify(params, {arrayFormat: 'bracket'})}`;
};
export const getRelatedArticles = () => '/articles/related_articles';
export const GET_LOOKUP_DATA = '/lookUpData';
export const GET_ASK_DOCTOR_COUNT_DATA = '/askDoctorData';


export const LOGIN = '/auth/login';
export const GET_USER_INFO = '/get_user_info';
export const SIGNUP = '/signup';

export const getThreadList = (page, tagIds, doctorId, mode = 'all') => {
  let params = {
    page: page,
    tag_ids: tagIds,
    doctor_id: doctorId,
    mode: mode
  };

  return `/toukous?${queryString.stringify(params, {arrayFormat: 'bracket'})}`;
};


export const getCommentList = (threadSlug) => `/toukous/${threadSlug}/get_comment_detail`;
export const CREATE_COMMENT = '/posts/';
export const deleteComment = (postId) => `/posts/${postId}`;
export const updateComment = (postId) => `/posts/${postId}`;
export const CREATE_THREAD = '/toukous/';
export const getThreadDetail = idOrSlug => `/toukous/${idOrSlug}`;
export const updateThread = (threadId) => `/toukous/${threadId}`;
export const like = (postId) => `/like/${postId}`;

export const GET_TAG_LIST = '/tags';
export const SEARCH_TAG = '/search_tag';

export const SEARCH_ALL = '/search';

export const GET_DOCTORS = '/doctors';
export const getDoctorDetail = (slug) => `/doctors/${slug}`;
export const GET_SPECIALITIES = '/specialities';
export const GET_FILTER_DATA = '/filter_data';


export const REMOVE_USER_TAG = '/remove_user_tag';
export const ADD_USER_TAG = '/add_user_tag';
export const GET_TAG_BY_IDS = '/tags/get_tags_by_ids';

export const GET_NOTIFICATIONS = '/notifications/';

export const FOLLOW_USER = '/users/follow';
export const UNFOLLOW_USER = '/users/unfollow';

export const GET_PROVINCES = '/provinces';
