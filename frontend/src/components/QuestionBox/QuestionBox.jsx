import React, { PureComponent } from 'react';
import { Form, Avatar, Input, Checkbox, Button, message } from 'antd';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './QuestionBox.scss';
import ThreadService from '../../services/threadService';

class QuestionBox extends PureComponent {
  state = {
    value: '',
    hidingCreator: false,
    submitting: false
  };

  handleSubmit = () => {
    if (!this.state.value) {
      message.warning('Nội dung không được để trống!');
      return;
    }
    if (this.state.value.length <= 30) {
      message.warning('Bạn nên cung cấp nhiều thông tin hơn để các bác sĩ có thể trả lời dễ dàng!');
      return;
    }
    this.setState({submitting: true});
    ThreadService.createThread(this.state.hidingCreator, this.state.value, this.props.token)
      .then(resp => {
        this.setState({
          value: '',
          hidingCreator: false,
          submitting: false
        });
        this.props.updateThreadList(resp);
      })
      .catch(error => {
        this.setState({submitting: false});
        console.log(error);
        message.error('Có lỗi đã xảy ra, vui lòng thử lại!');
      });
  };

  handleTextAreaChange = (e) => {
    this.setState({value: e.target.value})
  };

  handleCheckBoxChange = (e) => {
    this.setState({hidingCreator: e.target.checked});
  };

  render() {
    const {value, hidingCreator, submitting} = this.state;
    return (
      <Form id="social-create" className="social-create">
        <div className="social-comment">
          <div className="pull-left">
            <Avatar icon="user" className="user-avatar-comment" />
          </div>
          <div className="social-body">
            <ul className="list-inline">
              <li>
                <div className="active">
                  <span><FontAwesomeIcon icon="question-circle" /></span>
                  Đặt câu hỏi
                </div>
              </li>
            </ul>
            <div>
              <hr />
              <hr className="arrow-tip" />
            </div>
          </div>
          <div className="media-body">
            <Input.TextArea
              rows={3} placeholder="Bạn muốn hỏi bác sĩ và cộng đồng điều gì?"
              value={value} onChange={this.handleTextAreaChange}
            />
          </div>
        </div>
        <Form.Item className="submit-form">
          <Checkbox className="editor-element" onChange={this.handleCheckBoxChange} checked={hidingCreator}>
            Đăng ẩn danh
          </Checkbox>
          <Button
            className="editor-element"
            htmlType="submit"
            type="primary"
            loading={submitting}
            onClick={this.handleSubmit}
          >
            <i><FontAwesomeIcon icon="paper-plane" /></i>
            Gửi
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

QuestionBox.propTypes = {
  token: PropTypes.string,
  updateThreadList: PropTypes.func
};

export default QuestionBox;