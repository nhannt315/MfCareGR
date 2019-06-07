import React, { PureComponent } from 'react';
import { Tooltip, message, notification, Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import UserService from '../../../../services/userService';
import './FollowButton.scss';

class FollowButton extends PureComponent {

  showNotification = (content, icon) => {
    notification.open({
      message: 'Theo dõi',
      description: content,
      icon: <Icon type={icon}/>
    });
  };

  handleFollowButtonClick = () => {
    const {token, targetUser, userData, addRemoveFollowUser} = this.props;
    if (!token) {
      message.warning('Bạn cần phải đăng nhập trước khi muốn theo dõi ' + targetUser.name);
      return;
    }
    const followed = userData.following.includes(targetUser.id);
    if (followed) {
      // will unfollow user
      UserService.unfollowUser(token, targetUser.id)
        .then(() => {
          this.showNotification(
            `Bạn đã bỏ theo dõi ${targetUser.name}`,
            'user-delete'
          );
          addRemoveFollowUser(targetUser.id, 'remove');
        })
        .catch(() => message.error('Đã có lỗi xảy ra, vui lòng thử lại sau!'));
    } else {
      // will follow user
      UserService.followUser(token, targetUser.id)
        .then(() => {
          this.showNotification(
            `Bạn đã theo dõi ${targetUser.name}`,
            'user-add'
          );
          addRemoveFollowUser(targetUser.id, 'add');
        })
        .catch(() => message.error('Đã có lỗi xảy ra, vui lòng thử lại sau!'));
    }
  };

  render() {
    const {userData, targetUser} = this.props;
    let title = '', iconName = '', className = 'follow', followed = false;
    if (userData.following) {
      followed = userData.following.includes(targetUser.id);
    }
    if (followed) {
      iconName = 'user-check';
      title = `Bỏ theo dõi ${targetUser.name}`;
      className = 'unfollow'
    } else {
      iconName = 'user-plus';
      title = `Theo dõi để không bỏ lỡ bài viết nào của ${targetUser.name}`;
      className = 'follow';
    }
    return (
      <span className="social-follow">
        <Tooltip title={title}>
          <i className={className} onClick={this.handleFollowButtonClick}><FontAwesomeIcon icon={iconName} /></i>
        </Tooltip>
      </span>
    );
  }
}

FollowButton.propTypes = {
  addRemoveFollowUser: PropTypes.func,
  userData: PropTypes.object,
  token: PropTypes.string,
  targetUser: PropTypes.object
};

export default FollowButton;