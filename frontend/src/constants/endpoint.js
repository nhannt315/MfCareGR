import queryString from 'querystring';

export const BASE_URL = 'http://localhost:4000';

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
export const getArticles = (page, perPage = 5) => `/articles?page=${page}&item_per_page=${perPage}`;
export const getRelatedArticles = () => '/articles/related_articles';
export const GET_LOOKUP_DATA = '/lookUpData';


export const LOGIN = '/auth/login';


export const getThreadList = (page, tagIds) => {
  let params = {
    page: page,
    tag_ids: tagIds
  };

  return `/toukous?${queryString.stringify(params)}`;
};


export const getCommentList = (threadSlug) => `/toukous/${threadSlug}/get_comment_detail`;
export const CREATE_COMMENT = '/posts/';
export const deleteComment = (postId) => `/posts/${postId}`;
export const updateComment = (postId) => `/posts/${postId}`;
export const CREATE_THREAD = '/toukous/';
export const updateThread = (threadId) => `/toukous/${threadId}`;
export const like = (postId) => `/like/${postId}`;

export const GET_TAG_LIST = '/tags';

export const SEARCH_ALL = '/search';

export const GET_DOCTORS = '/doctors';
export const GET_SPECIALITIES = '/specialities';
export const GET_FILTER_DATA = '/filter_data';