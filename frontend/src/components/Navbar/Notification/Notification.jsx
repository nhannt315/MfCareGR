import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Badge, Dropdown } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Notification.scss';

const DEFAULT_IMAGE = 'https://dwbxi9io9o7ce.cloudfront.net/build/f4706672a682503c789805d7368993ff.jpg';

class NotificationList extends React.PureComponent {

  state = {
    showDot: true
  };

  disableShowDot = () => {
    this.setState({showDot: false});
  };

  enableShowDot = () => {
    this.setState({showDot: true});
  };

  render() {
    const {notificationList} = this.props;
    const {showDot} = this.state;
    return (
      <div className="notification-area">
        <Dropdown trigger={['click']} overlay={
          <div className="dropdown-menu-notification">
            <div className="dropdown-body">
              <span className="triangle" />
              {notificationList.length === 0 && (
                <div className="no-notification">Không có thông báo nào</div>
              )}
              {notificationList.map(noti => (
                <div className="notification" key={noti._id}>
                  <div className="notification-image-wrapper">
                    <div className="notification-image">
                      <img
                        src={noti.sender.avatar ? noti.sender.avatar : DEFAULT_IMAGE}
                        alt="" width="32" />
                    </div>
                  </div>
                  <Link to={`/hoi-bac-si/${noti.threadSlug}`} className="notification-text">
                    <span className="highlight"></span>
                    {noti.content}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        }>
          <Badge dot={showDot} className="notification-icon" onClick={this.disableShowDot}>
            <i><FontAwesomeIcon icon="bell" /></i>
          </Badge>
        </Dropdown>
      </div>
    );
  }
}

NotificationList.propTypes = {
  notificationList: PropTypes.array,
  notificationLoading: PropTypes.bool
};

export default NotificationList;
