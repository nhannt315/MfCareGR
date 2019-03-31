import React, { PureComponent } from 'react';
import { List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';

import './ThreadList.scss';
import ThreadItem from './ThreadItem';
import Loader from '../Loader';

class ThreadList extends PureComponent {
  render() {
    const hasMore = true;
    const {
      threadList, isLoading, fetchThreadList, initialLoading,
      isAuthenticated, userData, token, updateThreadList, updateTagThread
    } = this.props;
    console.log('initial', initialLoading);
    if (initialLoading) {
      console.log('render initial');
      return (
        <div>
          <Skeleton avatar paragraph={{ rows: 4 }} />
          <Skeleton avatar paragraph={{ rows: 4 }} />
          <Skeleton avatar paragraph={{ rows: 4 }} />
          <Skeleton avatar paragraph={{ rows: 4 }} />
        </div>
      );
    }
    return (
      <div>
        <InfiniteScroll
          initialLoad={false}
          pageStart={1}
          loadMore={fetchThreadList}
          hasMore={!isLoading && hasMore}
          useWindow={true}
          loader={<Loader key={'hmmmm'} />}
        >
          <List
            key="hello-its-me-2"
            dataSource={threadList}
            renderItem={item => (
              <ThreadItem
                thread={item} updateThreadList={updateThreadList} isAuthenticated={isAuthenticated}
                userData={userData} token={token} updateTagThread={updateTagThread}
                updateLikeThread={this.props.updateLikeThread}
              />
            )}
          />
        </InfiniteScroll>
      </div>
    );
  }
}

ThreadList.propTypes = {
  threadList: PropTypes.array,
  isLoading: PropTypes.bool,
  fetchThreadList: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  userData: PropTypes.object,
  token: PropTypes.string,
  updateThreadList: PropTypes.func,
  updateTagThread: PropTypes.func,
  updateLikeThread: PropTypes.func,
  initialLoading: PropTypes.bool
};

export default ThreadList;