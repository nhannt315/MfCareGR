import React, { PureComponent } from 'react';
import { Icon, message } from 'antd';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserInfoForm from '../UserInfoForm';
import UserService from '../../services/userService';
import UploadService from '../../services/uploadService';
import './UserDetail.scss';

class UserDetail extends PureComponent {
  state = {
    editMode: false,
    provinces: [],
    submitting: false,
    avatarList: []
  };

  avatarListChange = ({fileList}) => {
    this.setState({avatarList: fileList});
  };

  componentDidMount() {
    UserService.getProvinces()
      .then(resp => this.setState({provinces: resp}))
      .catch(error => {
        console.log(error);
        message.error('Có lỗi xảy ra khi lấy thông tin các địa điểm!');
      })
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  turnOnEditMode = () => {
    this.setState({
      avatarList: [{
        uid: '-1',
        name: 'xxx.png',
        url: this.props.userData.avatar
      }]
      , editMode: true
    });
  };


  handleSubmit = (values) => {
    const {token, userData} = this.props;
    const payload = {
      name: values.name,
      display_name: values.showName,
      gender: values.gender,
      phone: values.phone,
      address: values.address,
      province_id: values.province,
      dob: values.dob.format('DD/MM/YYYY')
    };
    this.setState({submitting: true});
    if (values.avatar.file) {
      UploadService.uploadImagesToCloudinary([values.avatar.file])
        .then(resp => {
          payload.avatar = resp[0].url;
          this.updateInfo(userData.id, token, payload);
        })
        .catch(error => {
          console.log(error);
          message.error('Có lỗi xảy ra, vui lòng thử lại sau!');
          this.setState({submitting: false});
        });
    } else {
      payload.avatar = null;
      this.updateInfo(userData.id, token, payload);
    }
  };

  updateInfo = (userId, token, payload) => {
    UserService.updateInfo(userId, token, payload)
      .then(resp => {
        this.props.updateUserData(resp);
        this.setState({editMode: false, submitting: false});
      })
      .catch(error => {
        console.log(error);
        message.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        this.setState({submitting: false});
      })
  };

  render() {
    const {editMode, provinces, submitting, avatarList} = this.state;
    const {userData} = this.props;
    return (
      <section className="customer">
        <div className="section-header">
          <h2>
            <i><FontAwesomeIcon icon="user" /></i>
            Tài khoản
          </h2>
          <div className="edit">
            {!editMode ? (
              <span className="for-not-editting" onClick={this.turnOnEditMode}>
                <i><Icon type="edit" /></i>
                Sửa thông tin
              </span>
            ) : (
              <span className="for-editting" onClick={() => this.setState({editMode: false})}>
                <i><Icon type="close" /></i>
                Hủy
              </span>
            )}
          </div>
        </div>
        <div className="section-body">
          <UserInfoForm userData={userData} editMode={editMode} provinces={provinces}
                        handleSubmit={this.handleSubmit} submitting={submitting}
                        wrappedComponentRef={this.saveFormRef} avatarList={avatarList}
                        avatarChange={this.avatarListChange} />
        </div>
      </section>
    );
  }
}

UserDetail.propTypes = {
  userData: PropTypes.object,
  token: PropTypes.string,
  updateUserData: PropTypes.func
};

export default UserDetail;
