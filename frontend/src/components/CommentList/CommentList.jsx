import React, { PureComponent } from 'react';
import { List, Modal, message } from 'antd';
import PropTypes from 'prop-types';

import './CommentList.scss';
import Loader from '../Loader';
import CommentItem from './CommentItem';
import ThreadService from '../../services/threadService';

const confirm = Modal.confirm;

class CommentList extends PureComponent {

  showConfirmDelete = (postId) => {
    confirm({
      title: 'Bạn có chắc muốn xóa bình luận này?',
      content: 'Thao tác này sẽ không hoàn lại được!!!',
      onOk: () => this.deletePost(postId),
      onCancel: () => console.log('cancel')
    });
  };

  deletePost = (postId) => {
    ThreadService.deleteComment(postId, this.props.token)
      .then(() => {
        message.success('Thành công!');
        this.props.updateDeleteComment(postId);
      })
      .catch(error => {
        console.log(error);
        message.error('Có lỗi đã xảy ra, vui lòng thử lại sau!');
      });
  };

  render() {
    const {userData} = this.props;
    const {commentList, loading, token, updateLikeComment} = this.props;
    if (loading) {
      return <Loader />;
    }
    if (commentList.length === 0) {
      return null;
    }
    return (
      <List
        itemLayout="vertical"
        dataSource={commentList}
        renderItem={item => <CommentItem
          userData={userData} comment={item}
          showConfirmDelete={this.showConfirmDelete}
          token={token} updateComment={this.props.updateComment}
          updateLikeComment={updateLikeComment}
        />}
      >
      </List>
    );
  }
}

CommentList.propTypes = {
  commentList: PropTypes.array,
  loading: PropTypes.bool,
  userData: PropTypes.object,
  token: PropTypes.string,
  updateDeleteComment: PropTypes.func,
  updateComment: PropTypes.func,
  updateLikeComment: PropTypes.func
};

export default CommentList;