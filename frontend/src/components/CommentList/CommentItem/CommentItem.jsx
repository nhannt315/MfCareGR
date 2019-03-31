import React, { PureComponent } from 'react';
import { Avatar, Comment, Icon, Tooltip, message } from 'antd';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import './CommentItem.scss';
import { getDateTime, generateColor } from '../../../shared/utilities';
import CommentBox from '../../CommentBox';
import ThreadService from '../../../services/threadService';

class CommentItem extends PureComponent {
  state = {
    isEdit: false,
    editSubmitting: false
  };

  handleCancelEdit = () => {
    this.setState({isEdit: false, editSubmitting: false});
  };

  handleLikeButton = (dislike = false) => {
    const {comment, token, userData} = this.props;
    if(dislike) {
      ThreadService.dislikePost(comment.id, token)
        .then(() => this.props.updateLikeComment('remove', comment.id, userData.id))
        .catch(() => message.error('Có lỗi đã xảy ra'));
    }else {
      ThreadService.likePost(comment.id, token)
        .then(() => this.props.updateLikeComment('add', comment.id, userData.id))
        .catch(() => message.error('Có lỗi đã xảy ra'));
    }
  };

  handelUpdatePost = (content, hidingCreator) => {
    this.setState({editSubmitting: true});
    ThreadService.updateComment(this.props.comment.id, hidingCreator, content, this.props.token)
      .then(resp => {
        console.log(resp);
        this.setState({editSubmitting: false});
        this.props.updateComment(resp);
        this.setState({isEdit: false});
      })
      .catch(error => {
        this.setState({editSubmitting: false});
        message.error('Có lỗi đã xảy ra, vui lòng thử lại sau!');
        console.log(error);
      });
  };

  showEditBox = () => {
    this.setState({isEdit: true});
  };

  render() {
    const {comment, userData, showConfirmDelete} = this.props;
    const {isEdit, editSubmitting} = this.state;
    let isLiked = false;
    if (userData) {
      isLiked = comment.likes.includes(userData.id);
    }
    const likeAction = (
      <span>
        <Tooltip title="Cảm ơn">
          <Icon
            type="heart"
            theme={isLiked ? 'filled' : 'outlined'}
            onClick={() => this.handleLikeButton(isLiked)}
          />
        </Tooltip>
        <span style={{paddingLeft: 8, cursor: 'auto'}}>
          {comment.likes.length}
        </span>
      </span>
    );
    const deleteAction = (
      <span onClick={() => showConfirmDelete(comment.id)}>
        <Icon
          type="delete"
          theme="outlined"
        />
        <span style={{paddingLeft: 8, cursor: 'pointer'}}>
          Xóa bình luận
        </span>
      </span>
    );
    const editAction = (
      <span onClick={this.showEditBox}>
        <Icon
          type="edit"
          theme="outlined"
        />
        <span style={{paddingLeft: 8, cursor: 'pointer'}}>
          Sửa
        </span>
      </span>
    );
    let actions = [likeAction];
    if (userData && userData.id === comment.author.id) {
      actions.push(deleteAction);
      actions.push(editAction);
    }
    let hideName = comment.hiding_creator;
    if (userData && userData.id === comment.author.id) {
      hideName = false;
    }
    return (
      <Comment
        key={comment.id}
        actions={actions}
        author={hideName ? 'Thành viên giấu tên' : comment.author.name}
        content={parse(comment.body_raw)}
        avatar={<Avatar shape="square" size={'large'} style={{backgroundColor: generateColor()}}>
          {hideName ? 'A' : comment.author.name[0]}
        </Avatar>}
        datetime={getDateTime(comment.updated_at)}
      >
        {isEdit ? (
          <CommentBox
            submitting={editSubmitting}
            isEdit
            initialValue={comment.body_raw}
            initialCheckBoxValue={comment.hiding_creator}
            handleCancel={this.handleCancelEdit}
            updatePost={this.handelUpdatePost}
            hidingCreator={comment.hiding_creator}
          />
        ) : null}
      </Comment>
    );
  }
}

CommentItem.propTypes = {
  userData: PropTypes.object,
  comment: PropTypes.object,
  showConfirmDelete: PropTypes.func,
  token: PropTypes.string,
  updateComment: PropTypes.func,
  likeCount: PropTypes.number,
  updateLikeComment: PropTypes.func
};

export default CommentItem;