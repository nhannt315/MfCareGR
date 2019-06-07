import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

import './DoctorQuestion.scss';
import QuestionBox from '../QuestionBox';
import ThreadList from '../ThreadList';

class DoctorQuestion extends PureComponent {

  componentDidMount() {
    this.props.clearThreadList();
    this.fetchThreadData();
  }

  fetchThreadData = () => {
    const {threadPage, getThreadList} = this.props;
    getThreadList(threadPage, [], this.props.doctor.id);
  };

  render() {
    const {
      doctor, threadList, isFetchingList, isAuthenticated, userData,
      token, addToThreadList, updateThreadList, updateTagThread, threadPage, hasMoreThread
    } = this.props;
    if (!doctor) {
      return (
        <Skeleton active paragraph={{rows: 10}} />
      );
    }
    const placeholder = `Bạn muốn hỏi ${doctor.job.name} ${doctor.name} điều gì ?`;
    return (
      <div>
        <QuestionBox token={token} placeholder={placeholder} updateThreadList={addToThreadList} />
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
          initialLoading={threadPage === 1 && isFetchingList}
          hasMore={hasMoreThread}
        />
      </div>
    );
  }
}

DoctorQuestion.propTypes = {
  doctor: PropTypes.object,
  threadList: PropTypes.array,
  isFetchingList: PropTypes.bool,
  threadListError: PropTypes.object,
  threadPage: PropTypes.number,
  getThreadList: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  userData: PropTypes.object,
  token: PropTypes.string,
  addToThreadList: PropTypes.func,
  updateThreadList: PropTypes.func,
  updateTagThread: PropTypes.func,
  updateLikeThread: PropTypes.func,
  clearThreadList: PropTypes.func,
  hasMoreThread: PropTypes.bool
};

export default DoctorQuestion;