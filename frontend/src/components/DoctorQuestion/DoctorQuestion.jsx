import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

import './DoctorQuestion.scss';
import QuestionBox from '../QuestionBox';

class DoctorQuestion extends PureComponent {

  updateThreadList = (thread) => {
    console.log(thread);
  };

  render() {
    const {doctor, token} = this.props;
    if (!doctor) {
      return (
        <Skeleton active paragraph={{rows: 10}} />
      );
    }
    const placeholder = `Bạn muốn hỏi ${doctor.job.name} ${doctor.name} điều gì ?`;
    return (
      <div>
        <QuestionBox token={token} placeholder={placeholder} updateThreadList={this.updateThreadList} />
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
  updateLikeThread: PropTypes.func
};

export default DoctorQuestion;