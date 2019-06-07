import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Row, Form, message, Input, Layout } from 'antd';

import config from '../../utils/config'
import Logo from '../../assets/images/logo.png';
import './LoginPage.less';
import * as actions from '../../store/actions';

const FormItem = Form.Item;

class LoginPage extends PureComponent {

  componentDidMount(){
    if (this.props.isAuthenticated) {
      this.props.history.push('/quan-ly');
    }
  }


  handleOk = () => {
    const {form} = this.props;
    const {validateFieldsAndScroll} = form;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      this.props.login(values.email, values.password, true);
    })
  };

  componentDidUpdate(prevProps, prevState) {
    const {isAuthenticated, errors, isAdmin} = this.props;
    if (errors && errors !== prevProps.errors) {
      message.error(errors.join(' '));
    }
    if (isAuthenticated && isAdmin) {
      message.success('Chào mừng bạn quay trở lại!');
      this.props.history.push('/quan-ly');
    }
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    const {isProcessing} = this.props;
    return (
      <Fragment>
        <div className="form">
          <div className="logo">
            <img alt="logo" src={Logo} />
            <span>{config.siteName}</span>
          </div>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('email', {
                rules: [
                  {type: 'email', message: 'Email này không hợp lệ'},
                  {required: true, message: 'Bạn cần phải nhập Email của mình'}
                ],
              })(
                <Input
                  onPressEnter={this.handleOk}
                  placeholder="Email"
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {required: true, message: 'Mật khẩu không được để trống'},
                ],
              })(
                <Input
                  type="password"
                  onPressEnter={this.handleOk}
                  placeholder="Mật khẩu"
                />
              )}
            </FormItem>
            <Row>
              <Button
                type="primary"
                onClick={this.handleOk}
                loading={isProcessing}
              >
                Đăng nhập
              </Button>
            </Row>
          </form>
        </div>
        <Layout.Footer className="footer">{config.copyright}</Layout.Footer>
      </Fragment>
    );
  }
}

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isProcessing: PropTypes.bool,
  errors: PropTypes.array,
  logout: PropTypes.func,
  login: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
  isAdmin: state.auth.isAdmin,
  isProcessing: state.auth.isProcessing
});

const mapDispatchToProps = dispatch => ({
  login: (email, password, remember) => dispatch(actions.login(email, password, remember)),
  logout: () => dispatch(actions.logout())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    Form.create()(LoginPage)
  )
);