import React, { PureComponent } from 'react';
import { Form, Input, Checkbox, Button, Upload, Select, Row, Col } from 'antd';
import PropTypes from 'prop-types';

import './DoctorDetailForm.scss';

const FormItem = Form.Item;

const FormFieldText = props => (
  <div className="form-field-text">
    {props.value ? props.value : <span>Chưa cung cấp</span>}
  </div>
);


class DoctorDetailForm extends PureComponent {
  state = {
    confirmDirty: false,
  };

  uploadFile = (file) => {
    console.log(file);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const {form, doctor, isEdit} = this.props;
    if (prevProps.isEdit !== isEdit && isEdit) {
      form.resetFields();
      form.setFieldsValue({
        name: doctor.name,
        specialities: doctor.specialities.map(ele => ele.id),
        ranks: doctor.ranks.map(ele => ele.id),
        degrees: doctor.degrees.map(ele => ele.id)
      });
    }
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    const {filterData, submitting, isEdit, doctor, approve, decline} = this.props;

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
          <Row>
            <Col sm={12} xs={12}>
              <FormItem
                {...formItemLayout}
                label="Họ và tên"
              >
                {isEdit && getFieldDecorator('name', {
                  rules: [{
                    required: true, message: 'Hãy nhập đầy đủ họ tên'
                  }]
                })(
                  <Input />
                )}
                {!isEdit && (
                  <div className="form-field-text">{doctor.name}</div>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Ảnh đại diện"
              >
                <div className="form-field-text">
                  {doctor.data_images.length > 0 && doctor.data_images[0] ? (
                    <span><img src={doctor.data_images[0]} alt={doctor.name} /></span>
                  ) : <em>Chưa cung cấp</em>}
                </div>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="E-mail"
              >
                <div className="form-field-text">
                  <span>{doctor.user ? doctor.user.email : 'Chưa cung cấp'}</span>
                </div>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Điện thoại"
              >
                <div className="form-field-text">
                  <span>{doctor.user ? doctor.user.phone : 'Chưa cung cấp'}</span>
                </div>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Chuyên khoa"
              >
                {isEdit && getFieldDecorator('specialities', {
                  rules: [{
                    required: true, message: 'Trường thông tin bắt buộc',
                  }]
                })(
                  <Select mode="multiple" placeholder="Chọn chuyên khoa">
                    {filterData.specialities.map(element => (
                      <Select.Option key={element.id} value={element.id}>{element.name}</Select.Option>
                    ))}
                  </Select>
                )}
                {!isEdit && (
                  <div className="form-field-text">
                    {doctor.specialities.length > 0 ? doctor.specialities.map(ele => ele.name).join(', ') :
                      <em>Chưa cung cấp</em>}
                  </div>
                )}
              </FormItem>
            </Col>
            <Col sm={12} xs={12}>
              <FormItem
                {...formItemLayout}
                label="Học hàm"
              >
                {isEdit && getFieldDecorator('ranks')(
                  <Select placeholder="Chọn học hàm" allowClear>
                    {filterData.ranks.map(element => (
                      <Select.Option key={element.id} value={element.id}>{element.name}</Select.Option>
                    ))}
                  </Select>
                )}
                {!isEdit && (
                  <div className="form-field-text">
                    {doctor.ranks.length > 0 ? doctor.ranks.map(ele => ele.name).join(', ') : <em>Chưa cung cấp</em>}
                  </div>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Học vị"
              >
                {isEdit && getFieldDecorator('degrees')(
                  <Select placeholder="Chọn học vị" allowClear>
                    {filterData.degrees.map(element => (
                      <Select.Option key={element.id} value={element.id}>{element.name}</Select.Option>
                    ))}
                  </Select>
                )}
                {!isEdit && (
                  <div className="form-field-text">
                    {doctor.degrees.length > 0 ? doctor.degrees.map(ele => ele.name).join(', ') :
                      <em>Chưa cung cấp</em>}
                  </div>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Nơi công tác"
              >
                <div className="form-field-text">{doctor.place ? doctor.place : 'Chưa cung cấp'}</div>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Chứng minh nhân dân"
              >
                <div className="form-field-text">
                  {doctor.identity_image ? (
                    <span><img src={doctor.identity_image} alt={doctor.name} /></span>
                  ) : <em>Chưa cung cấp</em>}
                </div>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Bằng cấp/ giấy phép"
              >
                <div className="form-field-text">
                  {doctor.license_image ? (
                    <span><img src={doctor.license_image} alt={doctor.name} /></span>
                  ) : <em>Chưa cung cấp</em>}
                </div>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Trạng thái"
              >
                {!doctor.user && <FormFieldText value="Chưa có người dùng quản lý" />}
                {doctor.user && doctor.activated ? <FormFieldText value="Đã được phê duyệt" /> : null}
                {doctor.user && !doctor.activated ? <FormFieldText value="Đang chờ phê duyệt" /> : null}
              </FormItem>
              {doctor.user && !doctor.activated && (
                <FormItem {...tailFormItemLayout}>
                  <Button loading={submitting} onClick={approve} className="confirm-button" type="primary"
                          shape="round">
                    Phê duyệt
                  </Button>
                  <Button loading={submitting} onClick={decline} className="confirm-button" type="primary"
                          shape="round">
                    Từ chối
                  </Button>
                </FormItem>
              )}
            </Col>
          </Row>
          {isEdit && (
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

DoctorDetailForm.propTypes = {
  form: PropTypes.object,
  specialities: PropTypes.array,
  submitting: PropTypes.bool,
  isEdit: PropTypes.bool,
  doctor: PropTypes.object,
  approve: PropTypes.func,
  decline: PropTypes.func,
  filterData: PropTypes.object,
  handleSubmit: PropTypes.func
};

export default Form.create()(DoctorDetailForm);