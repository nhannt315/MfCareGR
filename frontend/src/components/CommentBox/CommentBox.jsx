import React, { PureComponent } from 'react';
import { Comment, Avatar, message } from 'antd';
import PropTypes from 'prop-types';

import './CommnetBox.scss';
import Editor from '../Editor';


class CommentBox extends PureComponent {
  state = {
    value: '',
    hidingCreator: false
  };

  componentDidMount() {
    if (this.props.initialValue) {
      this.setState({value: this.props.initialValue});
    }
    if (this.props.hidingCreator) {
      this.setState({hidingCreator: this.props.hidingCreator});
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleCheckBoxChange = (e) => {
    this.setState({hidingCreator: e.target.checked});
  };

  handleSubmit = () => {
    if (!this.state.value) {
      message.warning('Nội dung không được để trống!');
      return;
    }
    if(this.props.isEdit){
      this.props.updatePost(this.state.value, this.state.hidingCreator);
    }else{
      this.props.replyThread(this.state.value, this.state.hidingCreator);
    }
  };


  render() {
    const {value} = this.state;
    const {isEdit, handleCancel} = this.props;
    return (
      <div className="comment-box">
        <Comment
          avatar={(
            <Avatar className="user-avatar" icon="user" />
          )}
          content={(
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              onCheckBoxChange={this.handleCheckBoxChange}
              submitting={this.props.submitting}
              value={value}
              checked={this.state.hidingCreator}
              isEditMode={isEdit}
              cancelCallBack={handleCancel}
            />)}
        />
      </div>
    );
  }
}

CommentBox.propTypes = {
  replyThread: PropTypes.func,
  updatePost: PropTypes.func,
  submitting: PropTypes.bool,
  isEdit: PropTypes.bool,
  handleCancel: PropTypes.func,
  initialValue: PropTypes.string,
  hidingCreator: PropTypes.bool
};

export default CommentBox;