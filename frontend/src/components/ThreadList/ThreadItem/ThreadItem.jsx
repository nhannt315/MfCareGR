import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Row, Col, Button, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import moment from 'moment';

import './ThreadItem.scss';
import TagList from '../../TagList';
import CommentList from '../../CommentList';
import CommentBox from '../../CommentBox';
import ThreadService from '../../../services/threadService';
import { generateColor, getDateTime } from '../../../shared/utilities';
import Editor from '../../Editor';
import EditableTagList from '../../EditableTagList/';


class ThreadItem extends PureComponent {

  state = {
    commentList: [],
    listLoading: false,
    listError: null,
    showReplyBox: false,
    submitting: false,
    editSubmitting: false,
    editMode: false,
    editChecked: false,
    editContent: '',
    editTag: false
  };

  componentDidMount() {
    this.setState({
      editChecked: this.props.thread.question.hiding_creator,
      editContent: this.props.thread.question.body_raw
    });
  }

  fetchCommentList = () => {
    this.setState({listLoading: true});
    ThreadService.getCommentList(this.props.thread.slug)
      .then(resp => this.setState({listLoading: false, commentList: resp.childrens}))
      .catch(error => this.setState({listLoading: false, listError: error}));
  };

  handleUpdateComment = (comment) => {
    const commentList = this.state.commentList;
    const commentIndex = commentList.findIndex(obj => obj.id === comment.id);
    const updatedCommentList = [
      ...commentList.slice(0, commentIndex),
      comment,
      ...commentList.slice(commentIndex + 1),
    ];
    this.setState({commentList: updatedCommentList});
  };

  handleDeleteComment = (postId) => {
    let newCommentList = JSON.parse(JSON.stringify(this.state.commentList));
    newCommentList = newCommentList.filter(obj => obj.id !== postId);
    this.setState({commentList: newCommentList});
  };

  replyThread = (content, hidingCreator) => {
    if (!this.props.isAuthenticated) {
      message.warning('Bạn cần phải đăng nhập trước khi gửi bình luận!');
      return;
    }
    this.setState({submitting: true});
    ThreadService.createComment(this.props.thread.id, hidingCreator, content, this.props.token)
      .then(resp => {
        console.log(resp);
        let newList = JSON.parse(JSON.stringify(this.state.commentList));
        newList.unshift(resp);
        this.setState({submitting: false, commentList: newList});
      })
      .catch(error => {
        this.setState({submitting: false});
        console.log(error);
      });
  };

  updateQuestion = () => {
    const {thread, token, updateThreadList} = this.props;
    const {editContent, editChecked} = this.state;
    this.setState({editSubmitting: true});
    ThreadService.updateThread(thread.id, editContent, editChecked, token)
      .then(resp => {
        this.setState({editSubmitting: false});
        this.handleCancelEdit();
        updateThreadList(resp);
      })
      .catch(error => {
        this.setState({editSubmitting: false});
        this.handleCancelEdit();
        console.log(error);
        message.error('Có lỗi đã xảy ra');
      });
  };

  updateLikeComment = (action, commentId, userId) => {
    const commentList = this.state.commentList;
    const commentIndex = commentList.findIndex(obj => obj.id === commentId);
    let oldLikeArray = commentList[commentIndex].likes;
    if (action === 'add') {
      oldLikeArray.push(userId);
    } else if (action === 'remove'){
      let index = oldLikeArray.indexOf(userId);
      if (index > -1) {
        oldLikeArray.splice(index, 1);
      }
    }
    const newComment = {...commentList[commentIndex], likes: oldLikeArray};
    const updatedCommentList = [
      ...commentList.slice(0, commentIndex),
      newComment,
      ...commentList.slice(commentIndex + 1),
    ];
    this.setState({commentList: updatedCommentList});
  };

  handleLikeClick = (disLike = false) => {
    if (!this.props.userData || !this.props.token) {
      message.warning('Bạn cần phải đăng nhập trước');
      return;
    }

    if (disLike) {
      ThreadService.dislikePost(this.props.thread.question.id, this.props.token)
        .then(() => {
          this.props.updateLikeThread('remove', this.props.thread.id, this.props.userData.id);
        })
        .catch(error => {
          console.log(error);
          message.error('Có lỗi đã xảy ra');
        });
    } else {
      ThreadService.likePost(this.props.thread.question.id, this.props.token)
        .then(() => {
          this.props.updateLikeThread('add', this.props.thread.id, this.props.userData.id);
        })
        .catch(error => {
          console.log(error);
          message.error('Có lỗi đã xảy ra');
        });
    }
  };

  handleCancelEdit = () => {
    this.setState({
      editChecked: this.props.thread.question.hiding_creator,
      editContent: this.props.thread.question.body_raw,
      editMode: false
    });
  };

  handleAnswerClicked = () => {
    const question = this.props.thread.question;
    this.setState({showReplyBox: !this.state.showReplyBox});
    if (question.comment_count <= 0) {
      // this.fetchCommentList();
    } else if (this.state.commentList.length <= 0) {
      this.fetchCommentList();
    }
  };

  clearCommentList = () => {
    this.setState({commentList: []});
  };

  render() {
    const {showReplyBox, commentList, listLoading, editMode, editTag} = this.state;
    const {thread, userData, token, updateTagThread} = this.props;
    const question = thread.question;
    const creator = thread.question.creator;
    const isOwned = userData.id === creator.id;
    let isLiked = false;
    if (userData) {
      isLiked = question.likes.includes(userData.id);
    }
    let gender = 'Nam';
    if (creator.gender) {
      gender = thread.question.creator.gender === 1 ? 'Nam' : 'Nữ';
    }

    let showName = thread.question.hiding_creator ? 'Thành viên giấu tên' : creator.name;
    let age = creator.dob ? moment().diff(creator.dob, 'years') : null;
    return (
      <div className="social-feed-box">
        <div className="social-avatar">
          <span className="image">
            <span className="mask">
              <Avatar shape="square" size={'large'} style={{backgroundColor: generateColor()}}>
                {showName[0]}
              </Avatar>
            </span>
          </span>
          <div className="media-body">
            <p>
              <Link to="/">{showName}</Link>
              <span><span><span> đã hỏi.</span></span></span>
            </p>
            <small>
              {thread.question.hiding_creator ? (
                <span>
                  {getDateTime(question.updated_at)}
                </span>
              ) : (
                <Link to={'/'}>
                  <span>
                    {getDateTime(question.updated_at)}
                  </span>
                  <span>
                    {gender}
                  </span>
                  <span>
                    {`${age} tuổi`}
                  </span>
                  <span>
                    {creator.province ? creator.province.name : null}
                  </span>
                </Link>
              )}
            </small>
          </div>
        </div>
        <div className="social-body">
          <div className="m-b-xs break-word">
            <p>{question.body_raw}</p>
          </div>
          <div>
            {isOwned && !editMode ? (
              <Button htmlType="submit" icon="edit" onClick={() => this.setState({editMode: true})}>Sửa</Button>
            ) : null}
          </div>
          <div className="social-select m-b-xs">
            {editTag ? (
              <EditableTagList
                tagList={thread.tags} threadId={thread.id} token={token}
                updateTagThread={updateTagThread}
                offEditMode={() => this.setState({editTag: false})}
              />
            ) : (
              <React.Fragment>
                <TagList tagList={thread.tags} style={{display: 'inline-block'}} />
                {isOwned && (
                  <Button
                    htmlType="submit"
                    icon="edit" shape="round"
                    onClick={() => this.setState({editTag: true})} />
                )}
              </React.Fragment>
            )}
          </div>
          <div>
            {editMode ? (
              <Editor
                checked={this.state.editChecked}
                value={this.state.editContent}
                submitting={this.state.editSubmitting}
                isEditMode
                onSubmit={this.updateQuestion}
                cancelCallBack={this.handleCancelEdit}
                onChange={(e) => this.setState({editContent: e.target.value})}
                onCheckBoxChange={(e) => this.setState({editChecked: e.target.checked})}
              />
            ) : null}
          </div>
          {isOwned ? (
            <div className="social-reminder">
              <p>
                Hãy chọn các chủ đề cho câu hỏi của bạn bằng cách bấm vào nút &quot;Thêm chủ
                đề&quot; ở trên. Chọn đúng chủ đề sẽ giúp cho câu hỏi của bạn được trả lời nhanh chóng, với chất lượng
                tốt hơn.
              </p>
            </div>
          ) : null}
          <div className="btn-group">
            <Row>
              <Col xs={24} md={14}>
                <div className="btn btn-sm">
                  <span
                    className={isLiked ? 'active-text like-active' : 'active-text'}
                    onClick={() => this.handleLikeClick(question.likes.includes(userData.id))}
                  >
                    <i><FontAwesomeIcon icon="heart" /></i>
                    Đồng cảm
                  </span>
                </div>
                <div className="btn btn-sm" onClick={this.handleAnswerClicked}>
                  <span className="active-text">
                    <i><FontAwesomeIcon icon="comment" /></i>
                    Trả lời
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="social-footer">
          <div className="social-like-box">
            {question.likes.length > 0 && (
              <span>
                <i><FontAwesomeIcon icon="heart" /></i>
                {` ${question.likes.length} người đã đồng cảm`}
              </span>
            )}
          </div>
          <div className="social-view-comment">
            <div>
              {thread.question.comment_count <= 0 ? (
                <div>Không có câu trả lời nào</div>
              ) : null}
              {thread.question.comment_count > 0 && commentList.length === 0 ? (
                <div className="view-answer" onClick={this.fetchCommentList}>Xem tất
                  cả {thread.question.comment_count} trả lời...</div>
              ) : null}
              {thread.question.comment_count > 0 && commentList.length > 0 ? (
                <div className="view-answer" onClick={this.clearCommentList}>Ẩn {thread.question.comment_count} câu trả
                  lời</div>
              ) : null}
            </div>
          </div>
          <CommentList
            loading={listLoading} commentList={commentList}
            userData={this.props.userData} token={this.props.token}
            updateDeleteComment={this.handleDeleteComment}
            updateComment={this.handleUpdateComment}
            updateLikeComment={this.updateLikeComment}
          />
        </div>
        <div className="social-reply">
          {showReplyBox ? <CommentBox replyThread={this.replyThread} submitting={this.state.submitting} /> : null}
        </div>
      </div>
    );
  }
}

ThreadItem.propTypes = {
  thread: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  userData: PropTypes.object,
  token: PropTypes.string,
  updateThreadList: PropTypes.func,
  updateTagThread: PropTypes.func,
  updateLikeThread: PropTypes.func
};

export default ThreadItem;