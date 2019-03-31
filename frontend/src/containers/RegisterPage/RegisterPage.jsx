import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Radio } from 'antd';
import PropTypes from 'prop-types';

import './RegisterPage.scss';
import * as RegisterForm from '../../components/RegisterForm';

class RegisterPage extends PureComponent {
  state = {
    formType: 'user'
  };

  switchForm = (e) => {
    this.setState({formType: e.target.value});
  };

  render() {
    const {formType} = this.state;
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
                {formType === 'user' ? <RegisterForm.UserForm /> : <RegisterForm.DoctorForm />}
              </Col>
              <Col xs={0} md={{span: 10, offset: 2}}>
                <img className="img-register" src="https://dwbxi9io9o7ce.cloudfront.net/img/sign-up.b3ab3fad0c0b.png" />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  match: PropTypes.object
};

export default withRouter(RegisterPage);