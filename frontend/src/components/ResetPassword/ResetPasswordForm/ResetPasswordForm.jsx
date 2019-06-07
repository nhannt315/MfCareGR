import React, { PureComponent } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

import './ResetPasswordForm.scss';

const FormItem = Form.Item;

class ResetPasswordForm extends PureComponent {

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  };
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Xác nhận mật khẩu phải trùng khớp với mật khẩu cũ!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 5},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 10},
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div id="login-form" className="form-wrapper animated bounceInRight">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="Mật khẩu hiện tại"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Hãy nhập mật khẩu hiện tại',
              }],
            })(
              <Input.Password type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Mật khẩu mới"
          >
            {getFieldDecorator('newPassword', {
              rules: [{
                required: true, message: 'Mật khẩu mới không được để trống',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input.Password type="password" placeholder="Mật khẩu mới phải có ít nhất 5 ký tự" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Xác nhận"
          >
            {getFieldDecorator('newConfirm', {
              rules: [{
                required: true, message: 'Hãy xác nhận mật khẩu mới của bạn',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input.Password type="password" onBlur={this.handleConfirmBlur} placeholder="Nhập lại mật khẩu mới" />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              className="confirm-button" loading={this.props.submitting} type="primary" shape="round" icon="login"
              htmlType="submit">
              Gửi đi
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  form: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
};

export default Form.create()(ResetPasswordForm);