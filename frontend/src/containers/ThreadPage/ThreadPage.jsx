import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';

import './ThreadPage.scss';
import ThreadService from '../../services/threadService';
import ThreadItem from '../../components/ThreadList/ThreadItem';
import PageLoader from '../../components/PageLoader';
import { Col, Row } from 'antd';

class ThreadPage extends PureComponent {

  state = {
    thread: null,
    threadLoading: false,
    slug: ''
  };

  componentDidMount() {
    console.log(this.props.match);
    console.log(this.props.history);
    let slug = this.props.match.params.slug;
    this.fetchThread(slug);
  }

  componentDidUpdate(prevProps, prevState) {
    let slug = this.props.match.params.slug;
    if (slug && slug !== this.state.slug) {
      this.fetchThread(slug);
    }
  }

  updateThreadList = thread => {
    this.setState({thread: thread});
  };

  updateLikeThread = (action, threadId, userId) => {
    let oldLikeArray = this.state.thread.question.likes;
    if (action === 'add') {
      oldLikeArray.push(userId);
    } else if (action === 'remove') {
      let index = oldLikeArray.indexOf(userId);
      if (index > -1) {
        oldLikeArray.splice(index, 1);
      }
    }
    const newThread = {...this.state.thread, question: {...this.state.thread.question, likes: oldLikeArray}};
    this.setState({thread: newThread});
  };

  updateTagThread = (threadId, tag, action) => {
    const {thread} = this.state;
    let oldTags = thread.tags;
    let newThread = thread;
    if (action === 'add') {
      oldTags.push(tag);
      const newTags = JSON.parse(JSON.stringify(oldTags));
      newThread = {...thread, tags: newTags};
    } else if (action === 'remove') {
      const tagIndex = oldTags.findIndex(obj => obj.id === tag.id);
      oldTags.splice(tagIndex, 1);
      const newTags = JSON.parse(JSON.stringify(oldTags));
      newThread = {...thread, tags: newTags};
    }
    this.setState({thread: newThread});
  };

  fetchThread = slug => {
    this.setState({slug: slug, thread: null, threadLoading: true});
    ThreadService.getThreadDetail(slug)
      .then(thread => {
        this.setState({thread: thread, threadLoading: false});
        console.log(thread);
      })
      .catch(error => {
        this.setState({threadLoading: false});
        console.log(error);
      })
  };

  render() {
    const {thread, threadLoading} = this.state;
    const {token, userData, isAuthenticated} = this.props;
    if (threadLoading && !thread)
      return <PageLoader />;
    return (
      <div className="bg-light-gray min-page-height clearfix">
        <div className="container m-t-sm">
          <Row>
            <Col xs={24} md={{span: 16, offset: 4}} className="m-b-md no-paddings">
              {thread && (
                <ThreadItem thread={thread} token={token} userData={userData} isAuthenticated={isAuthenticated}
                            commentList={thread.question.childrens} isThreadDetail
                            updateThreadList={this.updateThreadList} updateLikeThread={this.updateLikeThread}
                            updateTagThread={this.updateTagThread}
                />
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

ThreadPage.propTypes = {
  token: PropTypes.string,
  userData: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  token: state.auth.tokenData,
  userData: state.auth.userData,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    ThreadPage
  )
);