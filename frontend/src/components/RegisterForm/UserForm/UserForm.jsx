import React, { PureComponent } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';

import './UserForm.scss';

const FormItem = Form.Item;

class UserForm extends PureComponent {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleRegister(values);
      }
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
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
    const {loading} = this.props;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
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
      <div id="user-form" className="form-wrapper animated bounceInRight">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="Họ và tên"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: 'Hãy nhập đầy đủ họ tên'
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'Email này không hợp lệ',
              }, {
                required: true, message: 'Bạn cần phải nhập Email của mình',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Điện thoại"
          >
            {getFieldDecorator('phone')(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Mật khẩu"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Mật khẩu không được để trống',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Xác nhận mật khẩu"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Hãy xác nhận mật khẩu của bạn',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              rules: [{required: true, message: 'Bạn phải đồng ý với điều khoản sử dụng'}],
              valuePropName: 'checked',
            })(
              <Checkbox>Tôi đã đọc <a href="/" style={{color: 'blue'}}>điều khoản sử dụng của MfCare</a></Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              className="confirm-button" type="primary" shape="round" icon="login" htmlType="submit"
              loading={loading}
            >
              Đăng ký
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

UserForm.propTypes = {
  form: PropTypes.object,
  handleRegister: PropTypes.func,
  loading: PropTypes.bool
};

export default Form.create()(UserForm);