import React, { PureComponent } from 'react';
import { Form, Input, Tooltip, Icon, DatePicker, Checkbox, Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';

import './LoginForm.scss';

const FormItem = Form.Item;

class LoginForm extends PureComponent {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleLogin(values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;

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
      <div id="login-form" className="form-wrapper animated bounceInRight">
        <Row>
          <Col xs={{span: 24}} md={{span: 16, offset: 8}} className="m-b-sm">
            <p className="text-muted text-has-line">
              <em>Đăng nhập bằng email</em>
            </p>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
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
            label="Mật khẩu"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Mật khẩu không được để trống',
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button className="confirm-button" type="primary" shape="round" icon="login" htmlType="submit">
              Đăng nhập
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.object,
  handleLogin: PropTypes.func
};

export default Form.create()(LoginForm);