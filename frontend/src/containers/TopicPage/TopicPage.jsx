import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { message, Tabs, Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './TopicPage.scss';
import PageLoader from '../../components/PageLoader';
import TagService from '../../services/tagService';
import ArticleList from '../../components/ArticleList';
import * as actions from '../../store/actions';
import ThreadList from '../../components/ThreadList';
import QuestionBox from '../../components/QuestionBox';

const DEFAULT_IMAGE = 'https://dwbxi9io9o7ce.cloudfront.net/build/f4706672a682503c789805d7368993ff.jpg';

class TopicPage extends PureComponent {

  state = {
    tag: null,
    tagLoading: false,
    articles: [],
    articleLoading: false,
    articlePage: 1,
    hasMoreArticle: false,
    threadMode: 'all'
  };

  componentDidMount() {
    const {slug} = this.props.match.params;
    this.setState({tagLoading: true});
    this.props.clearThreadList();
    this.props.clearArticleList();
    TagService.getTagDetail(slug)
      .then(resp => {
        this.setState({tag: resp, tagLoading: false});
        document.title = `Chủ đề ${resp.name}`;
        this.fetchThreadData();
        this.fetchArticleData();
      })
      .catch(error => {
        message.error('Có lỗi xảy ra1');
        console.log(error);
        this.setState({tagLoading: false});
      });
  }

  changeThreadListMode = (mode) => {
    this.props.clearThreadList();
    this.setState({threadMode: mode}, () => this.fetchThreadData());
  };

  handleFollowTag = () => {
    const tag = this.state.tag;
    const {isAuthenticated, userData, token, addRemoveUserTag} = this.props;
    if (!isAuthenticated) {
      message.warning('Bạn cần phải đăng nhập trước khi theo dõi!');
      return;
    }
    const followed = userData.tags.includes(tag.id);
    if (followed) {
      TagService.removeUserTag(tag.id, token)
        .then(resp => {
          console.log(resp);
          addRemoveUserTag(tag.id, 'remove');
        })
        .catch(error => {
          console.log(error);
          message.error('Đã có lỗi xảy ra!');
        });
    } else {
      TagService.addUserTag(tag.id, token)
        .then(resp => {
          console.log(resp);
          addRemoveUserTag(tag.id, 'add');
        })
        .catch(error => {
          console.log(error);
          message.error('Đã có lỗi xảy ra!');
        });
    }
  };

  fetchThreadData = () => {
    const {page, getThreadList} = this.props;
    const {threadMode} = this.state;
    getThreadList(page, [this.state.tag.id], threadMode);
  };

  fetchArticleData = () => {
    const {articlePage, getArticleList} = this.props;
    getArticleList(articlePage, [this.state.tag.id]);
  };

  render() {
    const {tag, tagLoading, threadMode} = this.state;
    const {
      threadList, isFetchingList, isAuthenticated, userData,
      token, addToThreadList, updateThreadList, updateTagThread, page, hasMore,
      articleHasMore, articleList, articleLoading, articlePage
    } = this.props;
    let isFollowed = false;
    if (!tag || tagLoading) {
      return <PageLoader />;
    }
    if (isAuthenticated) {
      isFollowed = userData.tags.includes(tag.id);
    }


    return (
      <div id="tag-detail">
        <div className="p-t-sm p-b-sm b-b bg-white tag-landing-header">
          <div className="container">
            <div className="image-sm" />
            <div className="tag-landing-information">
              <h4 className="m-b-xs"><strong><span>Chủ đề </span>{tag.name}</strong></h4>
              <span className="tag-follow-button">
                <button className={`tag ${isFollowed ? 'following' : 'not-following'}`} onClick={this.handleFollowTag}>
                  {isFollowed ? 'Đang theo dõi' : 'Theo dõi'}
                  <i>
                    {isFollowed ? <FontAwesomeIcon icon="plus-circle" /> : <FontAwesomeIcon icon="check-circle" />}
                  </i>
                </button>
              </span>
              <div className="user-count"><span id="tag-user-count-3409">{tag.user_ids.length}</span>
                {'  '}Người theo dõi
              </div>
            </div>
          </div>
        </div>
        <div className="min-page-height clearfix">
          <div className="container">
            <Tabs defaultActiveKey="article">
              <Tabs.TabPane tab={`Bài viết ${tag.article_ids.length}`} key="article">
                <Row>
                  <Col xs={24} md={18} lg={16}>
                    <ArticleList
                      loading={articleLoading} hasMore={articleHasMore}
                      initialLoading={articlePage === 1 && articleLoading}
                      articles={articleList} fetchArticle={this.fetchArticleData}
                    />
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab={`Câu hỏi ${tag.thread_ids.length}`} key="thread">
                <Row>
                  <Col xs={24} md={18} lg={16}>
                    <QuestionBox token={token} updateThreadList={addToThreadList} />
                    <div className="feeds-filter">
                      <ul className="feeds-filters scrollable-feeds-filter list-inline text-center m-xs">
                        <li
                          onClick={() => this.changeThreadListMode('all')}
                          className={threadMode === 'all' ? 'active' : 'none'}>
                          <div>Mới nhất</div>
                        </li>
                        <li
                          onClick={() => this.changeThreadListMode('most_commented')}
                          className={threadMode === 'mose_commented' ? 'active' : 'none'}>
                          <div>Sôi nổi nhất</div>
                        </li>
                        <li
                          onClick={() => this.changeThreadListMode('unanswered')}
                          className={threadMode === 'unanswered' ? 'active' : 'none'}>
                          <div>Chưa trả lời</div>
                        </li>
                      </ul>
                    </div>
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
                      hasMore={hasMore}
                    />
                  </Col>
                </Row>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

TopicPage.propTypes = {
  match: PropTypes.object,
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
  articleList: PropTypes.array,
  articleLoading: PropTypes.bool,
  articlePage: PropTypes.number,
  articleHasMore: PropTypes.bool,
  getArticleList: PropTypes.func,
  clearArticleList: PropTypes.func
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
    totalThread: state.thread.total,
    articleList: state.article.articles,
    articleLoading: state.article.articleLoading,
    articlePage: state.article.page,
    articleHasMore: state.article.hasMore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getThreadList: (page, tagIds = [], mode) => dispatch(actions.getThreadList(page, tagIds, null, mode)),
    addToThreadList: (thread) => dispatch(actions.addToThreadList(thread)),
    updateThreadList: (thread) => dispatch(actions.updateThreadList(thread)),
    updateTagThread: (threadId, tag, action) => dispatch(actions.updateTagThread(action, threadId, tag)),
    updateLikeThread: (action, threadId, userId) => dispatch(actions.updateLikeStatus(action, threadId, userId)),
    clearThreadList: () => dispatch(actions.clearThreadList()),
    addRemoveUserTag: (tagId, action) => dispatch(actions.addRemoveTagUser(tagId, action)),
    getArticleList: (page, tagIds = []) => dispatch(actions.fetchArticle(page, tagIds)),
    clearArticleList: () => dispatch(actions.clearArticle())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    TopicPage
  )
);