import React, { PureComponent } from 'react';
import { Row, Col, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as actions from '../../store/actions';
import './AskDoctor.scss';
import ArticleService from '../../services/articleService';
import CommonService from '../../services/commonService';
import TagService from '../../services/tagService';
import ArticleList from '../../components/ArticleList';
import ThreadList from '../../components/ThreadList';
import QuestionBox from '../../components/QuestionBox';
import TagManager from '../../components/TagManager';

class AskDoctor extends PureComponent {

  state = {
    type: 'thread',
    articles: [],
    articlePage: 1,
    hasMoreArticle: true,
    articleLoading: false,
    articleError: null,
    articleCount: 0,
    articlesRecommend: [],
    articlePageRecommend: 1,
    hasMoreArticleRecommend: true,
    articleLoadingRecommend: false,
    articleErrorRecommend: null,
    articleCountRecommend: 0,
    showTagManager: false,
    userTags: []
  };

  componentDidMount() {
    this.getArticleCount();
    document.title = 'Hỏi bác sĩ';
    if (this.state.type === 'article') {
      this.fetchArticleData();
    } else if (this.state.type === 'thread') {
      this.props.clearThreadList();
      this.fetchThreadData();
    } else if (this.state.type === 'recommend' && this.props.isAuthenticated) {
      this.fetchArticleData();
    }
  }

  getArticleCount = () => {
    const {isAuthenticated, userData} = this.props;
    let tagIds = isAuthenticated ? userData.tags : [];
    CommonService.getCountData(tagIds)
      .then(resp => {
        this.setState({articleCount: resp.article, articleCountRecommend: resp.recommend});
      })
      .catch(() => {
        message.error('Lỗi máy chủ!');
      });
  };

  getTagListUser = () => {
    const {userData} = this.props;
    if (userData && userData.tags) {
      if (userData.tags.length === 0) {
        return;
      }
      TagService.getTagByIds(userData.tags)
        .then(resp => {
          this.setState({userTags: resp});
        })
        .catch(error => {
          console.log(error);
          message.error('Có lỗi xảy ra khi lấy danh sách thẻ!');
        });
    }
  };

  closeTagManager = () => {
    const {clearThreadList, isAuthenticated} = this.props;
    this.setState({showTagManager: false});
    this.fetchThreadData();
    if (this.state.type === 'thread') {
      clearThreadList();
      this.fetchThreadData();
    } else if (this.state.type === 'recommend' && isAuthenticated) {
      this.setState({
        articlesRecommend: [],
        articlePageRecommend: 1,
        hasMoreArticleRecommend: true,
        articleLoadingRecommend: false,
        articleErrorRecommend: null,
        articleCountRecommend: 0,
      }, () => {
        this.getArticleCount();
        this.fetchRecommendArticle();
      });
    }
  };

  fetchRecommendArticle = () => {
    this.setState({articleLoadingRecommend: true});
    const {articlePageRecommend, articlesRecommend} = this.state;
    ArticleService.getArticles(articlePageRecommend, 5, this.props.userData.tags)
      .then(resp => {
        this.setState({
          articleLoadingRecommend: false,
          hasMoreArticleRecommend: resp.has_more,
          articlesRecommend: articlesRecommend.concat(resp.articles),
          articlePageRecommend: articlePageRecommend + 1
        });
      })
      .catch(error => {
        this.setState({hasMoreArticleRecommend: false, articleLoadingRecommend: false, articleErrorRecommend: error});
      });
  };

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
    const {isAuthenticated, userData, page, getThreadList} = this.props;
    if (isAuthenticated) {
      getThreadList(page, userData.tags);
    } else {
      getThreadList(page);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.type !== prevState.type) {
      if (this.state.type === 'article') {
        this.fetchArticleData();
      } else if (this.state.type === 'thread') {
        this.fetchThreadData();
      } else if (this.state.type === 'recommend' && this.props.isAuthenticated) {
        this.fetchRecommendArticle();
      }
    }

    if (prevProps.isAuthenticated !== this.props.isAuthenticated && !this.props.isAuthenticated) {
      this.props.clearThreadList();
      this.fetchThreadData();
    }
  }

  render() {
    const {articles, hasMoreArticle, articleLoading, type, articleCount, showTagManager, userTags} = this.state;
    const {
      articlesRecommend, hasMoreArticleRecommend, articleLoadingRecommend,
      articleCountRecommend
    } = this.state;
    const {
      threadList, isFetchingList, isAuthenticated, userData,
      token, addToThreadList, updateThreadList, updateTagThread, page, hasMore, addRemoveUserTag, totalThread,
      addRemoveFollowUser
    } = this.props;
    let renderComponent = null;
    if (type === 'article') {
      renderComponent = (
        <ArticleList
          loading={articleLoading} fetchArticle={this.fetchArticleData} articles={articles}
          hasMore={hasMoreArticle} initialLoading={this.state.articlePage === 1 && articleLoading}
        />
      );
    } else if (type === 'thread') {
      renderComponent = (
        <React.Fragment>
          {isAuthenticated && userData.doctor_id ? null : (
            <QuestionBox token={token} updateThreadList={addToThreadList} />
          )}
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
            addRemoveFollowUser={addRemoveFollowUser}
            hasMore={hasMore}
          />
        </React.Fragment>
      );
    } else if (type === 'recommend') {
      renderComponent = (
        <ArticleList
          loading={articleLoadingRecommend} fetchArticle={this.fetchRecommendArticle} articles={articlesRecommend}
          hasMore={hasMoreArticleRecommend}
          initialLoading={this.state.articlePageRecommend === 1 && articleLoadingRecommend}
        />
      );
    }
    return (
      <div className="bg-light-gray min-page-height clearfix">
        <div className="container" style={{marginTop: '1.6rem'}}>
          <Row>
            <Col md={6} sm={6} xs={6} className="lg-feeds-filter">
              <div className="panel panel-transparent">
                <div>
                  {isAuthenticated && (
                    <div className="tag-manager-heading">
                      <span>
                        <i><FontAwesomeIcon icon="rss" /></i>
                        Bạn đang xem {userData.tags.length || 0} chủ đề
                      </span>
                      <div onClick={() => this.setState({showTagManager: !showTagManager})}>
                        {' '}(Quản lý)
                      </div>
                    </div>
                  )}
                  {isAuthenticated && (
                    <div
                      className={`panel-heading ${type === 'recommend' ? 'active' : ''}`}
                      onClick={() => this.setState({type: 'recommend'})}
                    >
                      Bài viết đáng quan tâm
                      <span className="post-count">{articleCountRecommend} bài</span>
                    </div>
                  )}
                  <div
                    className={`panel-heading ${type === 'article' ? 'active' : ''}`}
                    onClick={() => this.setState({type: 'article'})}
                  >
                    Tất cả bài viết
                    <span className="post-count">{articleCount} bài</span>
                  </div>
                  <div
                    className={`panel-heading ${type === 'thread' ? 'active' : ''}`}
                    onClick={() => this.setState({type: 'thread'})}
                  >
                    Cộng đồng
                    <span className="post-count">{totalThread} thảo luận</span>
                  </div>
                  <hr />
                </div>
              </div>
              {showTagManager && (
                <TagManager
                  token={token}
                  isAuthenticated={isAuthenticated}
                  userData={userData}
                  closeTagManager={this.closeTagManager}
                  addRemoveUserTag={addRemoveUserTag}
                  getTagList={this.getTagListUser}
                  userTags={userTags}
                />
              )}
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
  updateLikeThread: PropTypes.func,
  hasMore: PropTypes.bool,
  clearThreadList: PropTypes.func,
  addRemoveUserTag: PropTypes.func,
  totalThread: PropTypes.number,
  addRemoveFollowUser: PropTypes.func
};

const mapStateToProps = state => {
  return {
    threadList: state.thread.threadList,
    isFetchingList: state.thread.isFetchingList,
    threadListError: state.thread.error,
    page: state.thread.page,
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.userData,
    token: state.auth.tokenData,
    hasMore: state.thread.hasMore,
    totalThread: state.thread.total
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getThreadList: (page, tagIds = []) => dispatch(actions.getThreadList(page, tagIds)),
    addToThreadList: (thread) => dispatch(actions.addToThreadList(thread)),
    updateThreadList: (thread) => dispatch(actions.updateThreadList(thread)),
    updateTagThread: (threadId, tag, action) => dispatch(actions.updateTagThread(action, threadId, tag)),
    updateLikeThread: (action, threadId, userId) => dispatch(actions.updateLikeStatus(action, threadId, userId)),
    clearThreadList: () => dispatch(actions.clearThreadList()),
    addRemoveUserTag: (tagId, action) => dispatch(actions.addRemoveTagUser(tagId, action)),
    addRemoveFollowUser: (userId, action) => dispatch(actions.addRemoveFollowUser(userId, action))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    AskDoctor
  )
);