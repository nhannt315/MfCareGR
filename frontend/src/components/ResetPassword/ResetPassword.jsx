import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ResetPassword.scss';
import ResetPasswordForm from './ResetPasswordForm';
import UserService from '../../services/userService';

class ResetPassword extends PureComponent {

  state = {
    submitting: false
  };

  handleSubmit = values => {
    const {token, history} = this.props;
    console.log(values);
    const payload = {
      current_password: values.password,
      new_password: values.newPassword,
      new_confirm: values.newConfirm
    };
    this.setState({submitting: true});
    UserService.changePassword(token, payload)
      .then(resp => {
        message.success('Đổi mật khẩu thành công');
        history.push('/tai-khoan');
      })
      .catch(error => {
        this.setState({submitting: false});
        let errMessage = '';
        if (error.response.status === 401) {
          errMessage = 'Mật khẩu hiện tại không chính xác, vui lòng nhập lại!';
        } else {
          errMessage = error.response.data.message
        }
        message.error(errMessage);
      })
  };

  render() {
    const {submitting} = this.state;
    return (
      <section className="change-password">
        <div className="section-header">
          <h2>
            <i><FontAwesomeIcon icon="key" /></i>
            Đổi mật khẩu
          </h2>
        </div>
        <div className="section-body">
          <ResetPasswordForm submitting={submitting} handleSubmit={this.handleSubmit} />
        </div>
      </section>
    );
  }
}

ResetPassword.propTypes = {
  token: PropTypes.string,
  history: PropTypes.object
};

export default ResetPassword;