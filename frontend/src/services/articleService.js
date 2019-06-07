// import queryString from 'query-string';

import ApiService from './Api';
import { BASE_URL, GET_TOP_ARTICLES, getArticles, getArticleDetail, getRelatedArticles } from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const articleService = {};

articleService.getTopArticles = () => client.get(GET_TOP_ARTICLES);
articleService.getArticles = (page, perPage = 5, tagIds = []) => client.get(getArticles(page, perPage, tagIds));
articleService.getArticleDetail = (slug) => client.get(getArticleDetail(slug));
articleService.getRelatedArticles = (tagIds) => {
  let params = {
    tag_ids: tagIds
  };
  return client.post(getRelatedArticles(tagIds), params);
};

export default articleService;
