import React, { PureComponent } from 'react';
import { Link, withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import './UserPage.scss';
import UserDetail from '../../components/UserDetail';
import ResetPassword from '../../components/ResetPassword';
import * as actions from '../../store/actions';

class UserDetailPage extends PureComponent {

  componentDidMount() {
    document.title = 'Thông tin tài khoản';
    if (!this.props.isAuthenticated) {
      this.props.history.push('/dang-nhap');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/dang-nhap');
    }
  }

  render() {
    const {userData, token, updateUserData, history} = this.props;
    return (
      <div id="account" className="has-aside">
        <div id="user-page-title" className="page-title">
          <div className="disease-background" />
          <div className="mask">
            <div className="container">
              <Breadcrumb style={{margin: '0 1.5rem'}}>
                <Breadcrumb.Item>
                  <Link to="/">Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/benh">Quản lý tài khoản</Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <h1>
                Thông tin tài khoản
              </h1>
            </div>
          </div>
        </div>
        <div className="position">
          <aside>
            <section className="collapsible-container collapsible-list">
              <h3>Xin chào, <span className="bind-name">{userData.name}</span></h3>
              <dl>
                <dt>
                  <Link to='/tai-khoan'>
                    <i><FontAwesomeIcon icon="user" /></i>
                    Thông tin tài khoản
                  </Link>
                </dt>
                <dt>
                  <Link to='/tai-khoan/doi-mat-khau'>
                    <i><FontAwesomeIcon icon="key" /></i>
                    Đổi mật khẩu
                  </Link>
                </dt>
                <dt>
                  <Link to='/tai-khoan'>
                    <i><FontAwesomeIcon icon="power-off" /></i>
                    Đăng xuất
                  </Link>
                </dt>
              </dl>
            </section>
          </aside>
          <div className="content">
            <Switch>
              <Route exact path="/tai-khoan/doi-mat-khau"
                     render={() => <ResetPassword token={token} history={history} />} />
              <Route exact path="/tai-khoan" render={() => (
                <UserDetail userData={userData} token={token} updateUserData={updateUserData} />
              )} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

UserDetailPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  userData: PropTypes.object,
  token: PropTypes.string,
  updateUserData: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userData: state.auth.userData,
  token: state.auth.tokenData
});

const mapDispatchToProps = dispatch => ({
  updateUserData: userData => dispatch(actions.updateUserData(userData))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDetailPage)
);
