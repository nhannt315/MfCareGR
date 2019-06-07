import ApiService from './Api';
import {
  BASE_URL,
  getRecentCrawledArticle
} from '../constants/endpoint';

const client = new ApiService({baseURL: BASE_URL});

const articleService = {};

articleService.getRecentCrawled = (page, perPage) => {
  return client.get(getRecentCrawledArticle(page, perPage));
};

export default articleService;