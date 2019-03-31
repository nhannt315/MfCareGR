import React, { PureComponent } from 'react';
import {List, Spin} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';

import ArticleItem from './ArticleItem';
import './ArticleList.scss';

class ArticleList extends PureComponent {
  render() {
    const {articles, loading, hasMore, fetchArticle} = this.props;
    return (
      <div>
        <InfiniteScroll
          initialLoad={true}
          pageStart={1}
          loadMore={fetchArticle}
          hasMore={!loading && hasMore}
          useWindow={true}
        >
          <List
            dataSource={articles}
            renderItem={item => (
              <ArticleItem article={item} />
            )}
          >
            {loading && hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

ArticleList.propTypes = {
  articles: PropTypes.array,
  loading: PropTypes.bool,
  hasMore: PropTypes.bool,
  fetchArticle: PropTypes.func
};

export default ArticleList;