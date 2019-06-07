import React, { PureComponent } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Avatar, Icon, Dropdown, Menu, notification } from 'antd';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './header.scss';
import Notification from '../Notification';
import { NOTIFICATION_URL } from '../../../constants/endpoint';
import NotificationService from '../../../services/notificationService';
import SearchBar from '../SearchBar';

class NavbarHeader extends PureComponent {

  socket = null;

  state = {
    notificationList: [],
    notificationLoading: false
  };

  constructor(props) {
    super(props);
    this.socket = io(NOTIFICATION_URL);
    this.notiListChild = React.createRef();
  }

  openNotification = (content, threadSlug) => {
    notification.open({
      message: 'Thông báo',
      description: content,
      onClick: () => {
        this.props.history.push(`/hoi-bac-si/${threadSlug}`);
      },
    });
  };

  componentDidMount() {
    const {isAuthenticated, token, history} = this.props;
    this.socket.on('connect', (data) => {
      if (this.props.isAuthenticated) {
        this.socket.emit('add_user', {
          userId: this.props.userData.id
        })
      }
      console.log(this.socket.id);
    });
    this.socket.on('notification', data => {
      let notificationList = JSON.parse(JSON.stringify(this.state.notificationList));
      notificationList.unshift(data);
      this.setState({notificationList: notificationList});
      this.openNotification(data.content, data.threadSlug);
      this.notiListChild.current.enableShowDot();
    });
    if (isAuthenticated) {
      this.getNotifications(token);
    }
  }

  componentDidUpdate(prevProps) {
    const {isAuthenticated, userData, token, history} = this.props;
    if (prevProps.isAuthenticated !== isAuthenticated) {
      console.log('here');
      if (isAuthenticated) {
        this.socket.emit('add_user', {
          userId: userData.id
        });
        this.getNotifications(token);
      } else {
        this.socket.emit('remove_user', {
          userId: prevProps.userData.id
        });
      }
    }
    this.setState({currentUri: history.location.pathname + history.location.search});
  }

  onLoginClicked = e => {
    e.preventDefault();
    const {history} = this.props;
    const uri = history.location.pathname + history.location.search;
    history.push(`/dang-nhap?next=${uri}`);
  };

  getNotifications = token => {
    this.setState({notificationLoading: true, notificationList: []});
    NotificationService.getNotifications(token)
      .then(result => {
        console.log(result);
        this.setState({notificationList: result, notificationLoading: false});
      })
      .catch(error => {
        this.setState({notificationLoading: false});
        console.log(error);
      });
  };

  render() {
    const {logout, userData, isAuthenticated} = this.props;
    const {notificationList, notificationLoading} = this.state;
    const {searchLoading, searchMode, searchResult, clearSearchResult, searchAll} = this.props;
    const userMenu = (
      <Menu>
        <Menu.Item>
          <Link to="/tai-khoan"><Icon type="user" />{' '}Thông tin tài khoản</Link>
        </Menu.Item>
        {userData.doctor_id && (
          <Menu.Item>
            <Link to={`/bac-si/${userData.doctor.slug}`}>
              <i style={{paddingRight: '5px'}}><FontAwesomeIcon icon="user-md"/></i>
              Thông tin bác sĩ
            </Link>
          </Menu.Item>
        )}
        <Menu.Item>
          <div onClick={logout}><Icon type="logout" />{' '}Đăng xuất</div>
        </Menu.Item>
      </Menu>
    );
    let navElement = null;
    let avatarElement = null;
    if (userData.doctor_id) {
      avatarElement = userData.doctor.data_images.length > 0 && userData.doctor.data_images[0] ? (
        <Avatar className="user-avatar" src={userData.doctor.data_images[0]} />
      ) : <Avatar className="user-avatar" icon="user" />;
    } else {
      avatarElement = userData.avatar ? (
        <Avatar className="user-avatar" src={userData.avatar} />
      ) : <Avatar className="user-avatar" icon="user" />;
    }
    if (isAuthenticated) {
      navElement = (
        <React.Fragment>
          <Notification ref={this.notiListChild} notificationList={notificationList}
                        notificationLoading={notificationLoading} />
          <span className="name">
            <Dropdown overlay={userMenu}>
              <div>
                {avatarElement}
                <span
                  className="bind-name">{userData.doctor ? `${userData.doctor.job.name} ${userData.name}` : userData.name}</span>
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
            <NavLink to="/dang-nhap" onClick={this.onLoginClicked}>
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
          <ul className="navbar-site">
            <li className="brand">
              <NavLink to={'/'}>
                <h2>MfCare</h2>
                <span className="hidden">MfCare.vn</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/hoi-bac-si">
                <Icon type="heart" />
                <span>Hỏi Bác sĩ</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/tra-cuu">
                <Icon type="book" />
                <span>Tra cứu</span>
              </NavLink>
            </li>
          </ul>
          <SearchBar searchResult={searchResult} searchLoading={searchLoading}
                     clearSearchResult={clearSearchResult} searchMode={searchMode} searchAll={searchAll}
          />
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
  logout: PropTypes.func,
  token: PropTypes.string,
  history: PropTypes.object,
  searchAll: PropTypes.func,
  searchLoading: PropTypes.bool,
  searchError: PropTypes.object,
  searchResult: PropTypes.object,
  searchMode: PropTypes.string,
  clearSearchResult: PropTypes.func
};

export default withRouter(NavbarHeader);
