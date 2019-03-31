import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, message } from 'antd';
import PropTypes from 'prop-types';

import './LoginPage.scss';
import * as actions from '../../store/actions';
import LoginForm from '../../components/LoginForm';

class LoginPage extends PureComponent {

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate() {
    const {isAuthenticated, errors} = this.props;
    if (isAuthenticated) {
      message.success('Chào mừng bạn quay trở lại với MfCare');
      this.props.history.push('/');
    }
    if (errors) {
      message.error('Đăng nhập thất bại, hãy kiểm tra lại email và mật khẩu');
    }
  }

  handleLogin = (values) => {
    this.props.login(values.email, values.password, true);
  };

  render() {
    return (
      <div id="login" className="container">
        <div className="p-t-lg p-b-xxl">
          <div className="has-switch-content all-others">
            <div className="signup-intro text-center m-b-lg">
              <h1 className="text-center text-uppercase">
                Chào mừng bạn {' '}
                <span>trở lại MfCare</span>
              </h1>
              <div className="for-other">
                <p>
                  <strong>Bạn chưa có tài khoản?</strong>
                  <em><Link to="/dang-ky">Mở tài khoản MfCare cực nhanh tại đây</Link></em>
                </p>
              </div>
            </div>
            <div className="signup-content">
              <Row>
                <Col xs={24} md={12}>
                  <LoginForm handleLogin={this.handleLogin} submitting={this.props.isProcessing}/>
                </Col>
                <Col xs={24} md={12}>
                  <div className="image-login">
                    <img src="https://dwbxi9io9o7ce.cloudfront.net/img/login.13a0121ae38b.jpg" alt="Login" />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  login: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.array,
  isProcessing: PropTypes.bool
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
    login: (email, password, remember) => dispatch(actions.login(email, password, remember))
  };
};


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    LoginPage
  )
);