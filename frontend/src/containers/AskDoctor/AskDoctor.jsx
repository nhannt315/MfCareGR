import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ArticleService from '../../services/articleService';
import PropTypes from 'prop-types';

import * as actions from '../../store/actions';
import './AskDoctor.scss';
import ArticleList from '../../components/ArticleList';
import ThreadList from '../../components/ThreadList';
import QuestionBox from '../../components/QuestionBox';

class AskDoctor extends PureComponent {

  state = {
    type: 'thread',
    articles: [],
    articlePage: 1,
    hasMoreArticle: true,
    articleLoading: false,
    articleError: null
  };

  componentDidMount() {
    if (this.state.type === 'article') {
      this.fetchArticleData();
    } else if (this.state.type === 'thread') {
      this.fetchThreadData();
    }

  }

  fetchArticleData = () => {
    this.setState({articleLoading: true});
    const {articlePage, articles} = this.state;
    ArticleService.getArticles(articlePage)
      .then(resp => {
        this.setState({
          articleLoading: false,
          hasMoreArticle: resp.has_more,
          articles: articles.concat(resp.articles),
          articlePage: articlePage + 1
        });
      })
      .catch(error => {
        this.setState({hasMoreArticle: false, articleLoading: false, error: error});
      });
  };

  fetchThreadData = () => {
    const {page, getThreadList} = this.props;
    getThreadList(page);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.type !== prevState.type) {
      if (this.state.type === 'article') {
        this.fetchArticleData();
      } else if (this.state.type === 'thread') {
        this.fetchThreadData();
      }
    }
  }

  render() {
    const {articles, hasMoreArticle, articleLoading, type} = this.state;
    const {
      threadList, isFetchingList, isAuthenticated, userData,
      token, addToThreadList, updateThreadList, updateTagThread, page
    } = this.props;
    let renderComponent = null;
    if (type === 'article') {
      renderComponent = (
        <ArticleList
          loading={articleLoading} fetchArticle={this.fetchArticleData} articles={articles}
          hasMore={hasMoreArticle} initialLoading={this.state.articlePage === 1 && articleLoading}
        />
      );
    } else {
      renderComponent = (
        <React.Fragment>
          <QuestionBox token={token} updateThreadList={addToThreadList} />
          <ThreadList
            threadList={threadList}
            isLoading={isFetchingList}
            fetchThreadList={this.fetchThreadData}
            isAuthenticated={isAuthenticated}
            userData={userData}
            token={token}
            updateThreadList={updateThreadList}
            updateTagThread={updateTagThread}
            updateLikeThread={this.props.updateLikeThread}
            initialLoading={page === 1 && isFetchingList}
          />
        </React.Fragment>
      );
    }
    return (
      <div className="bg-light-gray min-page-height clearfix">
        <div className="container" style={{marginTop: '1.6rem'}}>
          <Row>
            <Col md={6} sm={6} xs={6} className="lg-feeds-filter">
              <div className="panel panel-transparent">
                <div>
                  <div
                    className={`panel-heading ${type === 'article' ? 'active' : ''}`}
                    onClick={() => this.setState({type: 'article'})}
                  >
                    Tất cả bài viết
                    <span className="post-count">19.527 bài</span>
                  </div>
                  <div
                    className={`panel-heading ${type === 'thread' ? 'active' : ''}`}
                    onClick={() => this.setState({type: 'thread'})}
                  >
                    Cộng đồng
                    <span className="post-count">370.062 thảo luận</span>
                  </div>
                  <hr />
                </div>
              </div>
            </Col>
            <Col md={18} sm={18} xs={18} style={{minHeight: '110vh'}}>
              {renderComponent}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

AskDoctor.propTypes = {
  threadList: PropTypes.array,
  isFetchingList: PropTypes.bool,
  threadListError: PropTypes.object,
  page: PropTypes.number,
  getThreadList: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  userData: PropTypes.object,
  token: PropTypes.string,
  addToThreadList: PropTypes.func,
  updateThreadList: PropTypes.func,
  updateTagThread: PropTypes.func,
  updateLikeThread: PropTypes.func
};

const mapStateToProps = state => {
  return {
    threadList: state.thread.threadList,
    isFetchingList: state.thread.isFetchingList,
    threadListError: state.thread.error,
    page: state.thread.page,
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.userData,
    token: state.auth.tokenData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getThreadList: (page, tagIds = []) => dispatch(actions.getThreadList(page, tagIds)),
    addToThreadList: (thread) => dispatch(actions.addToThreadList(thread)),
    updateThreadList: (thread) => dispatch(actions.updateThreadList(thread)),
    updateTagThread: (threadId, tag, action) => dispatch(actions.updateTagThread(action, threadId, tag)),
    updateLikeThread: (action, threadId, userId) => dispatch(actions.updateLikeStatus(action, threadId, userId))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    AskDoctor
  )
);