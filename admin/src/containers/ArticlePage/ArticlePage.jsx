import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {message} from 'antd';

import Page from '../../components/Page';
import ArticleService from '../../services/articleService';

class ArticlePage extends PureComponent {

  state = {
    articleList: [],
    page: 1,
    loading: false
  };

  componentDidMount(){
    this.fetchArticle();
  }

  fetchArticle = () => {
    const {page} = this.state;
    this.setState({loading: true});
    ArticleService.getRecentCrawled(page, 10)
      .then(resp => {
        this.setState({loading: false, articleList: resp, page: page + 1});
        console.log(resp)
      })
      .catch(resp => {
        message.error('Có lỗi xảy ra khi lấy dữ liệu!');
        this.setState({loading: false});
      });
  };

  render() {
    const {loading} = this.state;
    return (
      <Page loading={loading}>
        
      </Page>
    );
  }
}

ArticlePage.propTypes = {};

export default ArticlePage;