import React, { PureComponent } from 'react';
import { Form, Input, Checkbox, Button, Upload, Select } from 'antd';
import PropTypes from 'prop-types';

import './DoctorForm.scss';

const FormItem = Form.Item;

class DoctorForm extends PureComponent {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    identityImgList: [],
    licenseImgList: []
  };

  uploadFile = (file) => {
    console.log(file);
  };

  handleIdentityImgChange = ({fileList}) => {
    this.setState({identityImgList: fileList});
  };

  handleLicenseImgChange = ({fileList}) => {
    this.setState({licenseImgList: fileList});
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
      callback('Mật khẩu nhập lại phải trùng khớp!');
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
    const {specialities, submitting} = this.props;
    const {identityImgList, licenseImgList} = this.state;

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
            {getFieldDecorator('phone', {
              rules: [{
                required: true, message: 'Trường thông tin bắt buộc',
              }]
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
          <FormItem
            {...formItemLayout}
            label="Chuyên khoa"
          >
            {getFieldDecorator('speciality', {
              rules: [{
                required: true, message: 'Trường thông tin bắt buộc',
              }]
            })(
              <Select mode="multiple">
                {specialities.map(element => (
                  <Select.Option key={element.id} value={element.id}>{element.name}</Select.Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Nơi công tác"
          >
            {getFieldDecorator('place', {
              rules: [{
                required: true, message: 'Trường thông tin bắt buộc',
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Chứng minh nhân dân"
          >
            {getFieldDecorator('identityImg', {
              rules: [{
                required: true, message: 'Trường thông tin bắt buộc',
              }]
            })(
              <Upload
                name="identityImg"
                data={this.uploadFile}
                beforeUpload={() => false}
                listType="picture-card"
                fileList={identityImgList}
                onChange={this.handleIdentityImgChange}
              >
                {identityImgList.length > 0 ? null : (
                  <Button icon="upload">
                    Tải ảnh lên
                  </Button>
                )}
              </Upload>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Bằng cấp/ giấy phép"
          >
            {getFieldDecorator('licenseImg', {
              rules: [{
                required: true, message: 'Trường thông tin bắt buộc',
              }]
            })(
              <Upload
                name="licenseImg"
                data={this.uploadFile}
                beforeUpload={() => false}
                listType="picture-card"
                fileList={licenseImgList}
                onChange={this.handleLicenseImgChange}
              >
                {licenseImgList.length > 0 ? null : (
                  <Button icon="upload">
                    Tải ảnh lên
                  </Button>
                )}
              </Upload>
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
            <Button loading={submitting} className="confirm-button" type="primary" shape="round" icon="login"
                    htmlType="submit">
              Đăng ký
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

DoctorForm.propTypes = {
  form: PropTypes.object,
  specialities: PropTypes.array,
  submitting: PropTypes.bool,
  handleRegister: PropTypes.func
};

export default Form.create()(DoctorForm);