import React, { PureComponent } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Avatar, Icon, Dropdown, Menu, Badge } from 'antd';
import PropTypes from 'prop-types';

// import Logo from '../../../assets/images/logo.png';
import './header.scss';

class NavbarHeader extends PureComponent {
  render() {
    const {logout, userData, isAuthenticated} = this.props;
    const userMenu = (
      <Menu>
        <Menu.Item>
          <Link to="/"><Icon type="user" />{' '}Thông tin tài khoản</Link>
        </Menu.Item>
        <Menu.Item>
          <div onClick={logout}><Icon type="logout" />{' '}Đăng xuất</div>
        </Menu.Item>
      </Menu>
    );
    let navElement = null;
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navElement = (
        <React.Fragment>
          <div className="notification-area">
            <Badge count={5} className="notification-icon">
              <Icon type="bell" />
            </Badge>
          </div>
          <span className="name">
            <Dropdown overlay={userMenu}>
              <div>
                <Avatar className="user-avatar" icon="user" />
                <span className="bind-name">{userData.name}</span>
              </div>
            </Dropdown>
          </span>
        </React.Fragment>
      );
    } else {
      navElement = (
        <ul className="nav-menu">
          <li>
            <NavLink to="/dang-ky" className="">
              <Icon type="user" />
              Đăng ký
            </NavLink>
          </li>
          <li>
            <NavLink to="/dang-nhap">
              <Icon type="login" />
              Đăng nhập
            </NavLink>
          </li>
        </ul>
      );
    }
    return (

      <div className="navbar-header">
        <div className="container">
          <NavLink to={'/'} className="navbar-brand">
            <h2>MfCare</h2>
            <span className="hidden">MfCare.vn</span>
          </NavLink>
          <div className="user">
            {navElement}
          </div>
        </div>
      </div>
    );
  }
}

NavbarHeader.propTypes = {
  isAuthenticated: PropTypes.bool,
  userData: PropTypes.object,
  logout: PropTypes.func
};

export default NavbarHeader;
