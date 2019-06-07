import React, { PureComponent } from 'react';
import { Form, Input, Button, Col, Row, Select, DatePicker, Tooltip, Icon, Upload } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

import './UserInfoForm.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'DD/MM/YYYY';


const FormFieldText = props => (
  <div className="form-field-text">
    {props.value ? props.value : <span>Chưa cung cấp</span>}
  </div>
);

class UserInfoForm extends PureComponent {

  state = {
    avatarList: []
  };

  componentDidMount() {
    const {form, userData} = this.props;
    form.setFieldsValue({
      name: userData.name
    });
  }

  uploadFile = (file) => {
    console.log(file);
  };

  componentDidUpdate(prevProps, prevState) {
    const {form, userData, editMode} = this.props;
    let gender = 0, province = 1, dob = moment('30/4/2019', dateFormat), avatar = {};
    if (userData.gender)
      gender = userData.gender;
    if (userData.province)
      province = userData.province.id;
    if (userData.dob)
      dob = moment(userData.dob);
    if (userData.avatar) {
      avatar = {
        uid: '-1',
        name: 'xxx.png',
        url: userData.avatar
      };

    }
    if (prevProps.editMode !== editMode && editMode) {
      form.resetFields();
      form.setFieldsValue({
        name: userData.name,
        showName: userData.showName,
        province: province,
        gender: gender,
        dob: dob,
        avatar: avatar
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {editMode, userData, avatarList, avatarChange, provinces} = this.props;
    let gender = null;
    switch (userData.gender) {
      case 0:
        gender = 'Không xác định';
        break;
      case 1:
        gender = 'Nam';
        break;
      case 2:
        gender = 'Nữ';
        break;
      default:
        gender = null;
        break;
    }

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
      <div id="user-detail-form" className="form-wrapper animated bounceInRight">
        <Row>
          <Col xs={{span: 24}} md={{span: 16, offset: 8}} className="m-b-sm">
            <p className="text-muted text-has-line">
              MfCare cam kết đảm bảo an toàn tuyệt đối cho các thông tin riêng tư của bạn.
            </p>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="E-mail"
          >
            <FormFieldText value={userData.email} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Họ và tên thật&nbsp;
                <Tooltip
                  title="Họ tên thật của bạn sẽ không bao giờ được hiển thị công khai trên ViCare. Họ tên thật của bạn có thể được cung cấp cho bác sĩ hoặc cở sở y tế khi bạn sử dụng các dịch vụ y tế cần đến tên thật (đặt hẹn, xét nghiệm...).">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {editMode && getFieldDecorator('name')(
              <Input />
            )}
            {!editMode && <FormFieldText value={userData.name} />}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Tên hiển thị&nbsp;
                <Tooltip
                  title="Đây là tên gọi được sự dụng cho các bài viết và hoạt động của bạn trên ViCare để các thành viên trong cộng đồng dễ nhận diện, xưng hô.">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {editMode && getFieldDecorator('showName')(
              <Input />
            )}
            {!editMode && <FormFieldText value={userData.showName} />}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Giới tính"
          >
            {editMode && getFieldDecorator('gender')(
              <Select>
                <Option value={0}>Chưa xác định</Option>
                <Option value={1}>Nam</Option>
                <Option value={2}>Nữ</Option>
              </Select>
            )}
            {!editMode && <FormFieldText value={gender} />}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Ngày sinh"
          >
            {editMode && getFieldDecorator('dob')(
              <DatePicker format={dateFormat} />
            )}
            {!editMode && <FormFieldText value={moment(userData.dob).format(dateFormat)} />}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Tỉnh thành"
          >
            {editMode && getFieldDecorator('province')(
              <Select>
                {provinces.map(province => (
                  <Option key={province.id} value={province.id}>{province.name}</Option>
                ))}
              </Select>
            )}
            {!editMode && <FormFieldText value={userData.province ? userData.province.name : 'Chưa cung cấp'} />}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Địa chỉ"
          >
            {editMode && getFieldDecorator('address')(
              <Input />
            )}
            {!editMode && <FormFieldText value={userData.address} />}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Số điện thoại"
          >
            {editMode && getFieldDecorator('phone')(
              <Input />
            )}
            {!editMode && <FormFieldText value={userData.phone} />}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Ảnh đại diện"
          >
            {editMode && getFieldDecorator('avatar')(
              <Upload
                name="avatar"
                data={this.uploadFile}
                beforeUpload={() => false}
                listType="picture-card"
                fileList={avatarList}
                onChange={avatarChange}
              >
                {avatarList.length > 0 ? null : (
                  <Button icon="upload">
                    Tải ảnh lên
                  </Button>
                )}
              </Upload>
            )}
            {!editMode && (
              <div className="form-field-text">
                {userData.avatar ? (
                  <span><img src={userData.avatar} alt={userData.name} /></span>
                ) : (
                  <span>Chưa cung cấp</span>
                )}
              </div>
            )}
          </FormItem>
          {editMode && (
            <FormItem {...tailFormItemLayout}>
              <Button
                className="confirm-button" loading={this.props.submitting} type="primary" shape="round" icon="edit"
                htmlType="submit">
                Lưu thông tin
              </Button>
            </FormItem>
          )}
        </Form>
      </div>
    );
  }
}


UserInfoForm.propTypes = {
  form: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  editMode: PropTypes.bool,
  userData: PropTypes.object,
  provinces: PropTypes.array,
  avatarList: PropTypes.array,
  avatarChange: PropTypes.func
};

export default Form.create()(UserInfoForm);
