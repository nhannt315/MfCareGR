import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Radio, message } from 'antd';
import PropTypes from 'prop-types';
import sha1 from 'js-sha1';

import * as actions from '../../store/actions';
import './RegisterPage.scss';
import * as RegisterForm from '../../components/RegisterForm';
import DoctorService from '../../services/doctorService';
import UploadService from '../../services/uploadService';

class RegisterPage extends PureComponent {
  state = {
    formType: 'user',
    errors: null,
    specialities: [],
    doctorSubmitting: false
  };

  componentDidMount() {
    document.title = 'Đăng ký';
    this.setState({errors: this.props.errors});
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
    }
    DoctorService.getSpecialities()
      .then(resp => this.setState({specialities: resp}))
      .catch(error => console.log(error));
  }

  switchForm = (e) => {
    this.setState({formType: e.target.value});
  };

  handleUserRegister = ({name, email, password, confirm, phone}) => {
    this.props.signUp(name, email, password, confirm, phone);
  };

  handleDoctorRegister = values => {
    let payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirm: values.confirm,
      phone: values.phone,
      place: values.place,
      specialities: values.speciality
    };
    this.setState({doctorSubmitting: true});
    UploadService.uploadImagesToCloudinary([values.identityImg.file, values.licenseImg.file])
      .then(resp => {
        console.log(resp);
        payload.identity_img = resp[0].url;
        payload.license_img = resp[1].url;
        return DoctorService.registerDoctor(payload)
      })
      .then(() => {
        this.setState({doctorSubmitting: false});
        message.success('Tài khoản bác sĩ đã được đăng ký,Quản trị viên sẽ kiểm duyệt và thông báo khi tài khoản được kích hoạt!');
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error.response);
        this.setState({doctorSubmitting: false});
        if (error && error.response && error.response.data)
          message.error(error.response.data.message.join(' '));
        else
          message.error('Có lỗi xảy ra');
      });
  };

  componentDidUpdate() {
    const {isAuthenticated, errors} = this.props;
    if (isAuthenticated) {
      message.success('Chào mừng bạn đến với MfCare');
      this.props.history.push('/');
    }
    if (errors && errors.data) {
      message.error(errors.data.errors.join('\n'));
    }
  }


  render() {
    const {formType, specialities, doctorSubmitting} = this.state;
    const {isProcessing} = this.props;
    return (
      <div id="signup" className="container">
        <div className="p-t-lg p-b-xxl">
          <div className="has-switch-content has-account-type-selector source-others">
            <div className="signup-intro text-center m-b-lg">
              <h1 className="text-center text-uppercase">Gia nhập MfCare</h1>
              <p>
                Chào mừng bạn đến với MfCare!
              </p>
              <div className="for-source-others">
                <p>
                  Mở tài khoản dễ dàng, nhanh chóng với một form duy nhất để có thể sử dụng đầy đủ các chức năng và dịch
                  vụ của MfCare.
                </p>
              </div>
              <p>
                <Link to="/dang-nhap/">Đăng nhập tại đây</Link> nếu bạn đã có tài khoản tại MfCare.
              </p>
            </div>
            <Row className="signup-content">
              <Col xs={24} md={{span: 12, offset: 0}}>
                <Row>
                  <Col xs={24} md={8}>
                    <label className="primary-label">Loại tài khoản:</label>
                  </Col>
                  <Col xs={24} md={16}>
                    <Radio.Group className="radio-group" onChange={this.switchForm} defaultValue='user'>
                      <Radio className="radio-register" value='user'>Thành viên</Radio>
                      <Radio className="radio-register" value='doctor'>Bác sĩ / chuyên gia / điều dưỡng...</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
                {formType === 'user' ? (
                  <RegisterForm.UserForm loading={isProcessing} handleRegister={this.handleUserRegister} />
                ) : <RegisterForm.DoctorForm specialities={specialities} submitting={doctorSubmitting}
                                             handleRegister={this.handleDoctorRegister} />}
              </Col>
              <Col xs={0} md={{span: 10, offset: 2}}>
                <img
                  alt="register" className="img-register"
                  src="https://dwbxi9io9o7ce.cloudfront.net/img/sign-up.b3ab3fad0c0b.png"
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  match: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.array,
  isProcessing: PropTypes.bool,
  signUp: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.errors,
    isProcessing: state.auth.isProcessing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: (name, email, password, confirm, phoneNumber) => dispatch(actions.signUp(email, name, password, confirm, phoneNumber))
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage));