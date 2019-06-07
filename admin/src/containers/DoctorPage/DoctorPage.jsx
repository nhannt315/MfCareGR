import React, { PureComponent } from 'react';
import { Table, Select, Input, Avatar } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash.debounce';
import connect from 'react-redux/es/connect/connect';

import DoctorService from '../../services/doctorService';
import DropOption from '../../components/DropOption';
import styles from './DoctorPage.less';
import * as actions from '../../store/actions';


class DoctorPage extends PureComponent {

  state = {
    doctorList: [],
    doctorListRender: [],
    doctorListMode: 'unregistered',
    page: 1,
    totalPage: 0,
    loading: false,
    query: ''
  };

  constructor(props) {
    super(props);
    this.debounceSearch = debounce(this.fetchDoctor, 300);
  }

  onInputChange = value => {
    this.setState({query: value});
    if (!value)
      return;
    this.debounceSearch(value);
  };

  handleMenuClick = (record, e) => {
    this.props.history.push(`/quan-ly/bac-si/${record.id}`);
  };

  columns = [
    {
      title: 'Ảnh',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 72,
      fixed: 'left',
      render: text => <Avatar style={{marginLeft: 8}} src={text} />,
    }, {
      title: 'Tên đầy đủ',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>
    }, {
      title: 'Số điện thoại',
      dataIndex: 'phone'
    }, {
      title: 'Trạng thái',
      dataIndex: 'status'
    }, {
      title: 'Email',
      dataIndex: 'email'
    }, {
      title: 'Chuyên khoa',
      dataIndex: 'specialities'
    }, {
      title: 'Nơi công tác',
      dataIndex: 'place'
    }, {
      title: 'Giấy tờ xác thực',
      dataIndex: 'indentityInfo',
      render: identityImgs => (
        <span>Click để xem chi tiết</span>
      )
    }, {
      title: 'Tùy chọn',
      key: 'operation',
      fixed: 'right',
      render: (text, record) => {
        return (
          <DropOption
            onMenuClick={e => this.handleMenuClick(record, e)}
            menuOptions={[
              {key: '1', name: 'Cập nhật'},
              {key: '2', name: 'Xóa'},
            ]}
          />
        )
      },
    },];

  handleChange = value => {
    this.setState({doctorListMode: value, page: 1}, () => this.fetchDoctor());
  };

  onRowClicked = (record, rowIndex) => {
    this.props.history.push(`/quan-ly/bac-si/${record.id}`);
  };

  componentDidMount() {
    this.fetchDoctor();
  }

  fetchDoctor = () => {
    const {page, doctorListMode, query} = this.state;
    const {token} = this.props;
    this.setState({loading: true});
    DoctorService.getList(page, 10, token, doctorListMode, query)
      .then(resp => {
        const doctorListRender = resp.doctors.map(doctor => {
          let status = '',
            avatar = 'https://previews.123rf.com/images/ihorbiliavskyi/ihorbiliavskyi1812/ihorbiliavskyi181200077/114296311-doctor-avatar-icon-profession-logo-male-character-a-man-in-professional-clothes-people-specialists-f.jpg';
          if (!doctor.user)
            status = 'Chưa có người dùng quản lý';
          if (doctor.user && doctor.activated)
            status = 'Đã được phê duyệt';
          if (doctor.user && !doctor.activated)
            status = 'Đang chờ phê duyệt';
          if (doctor.data_images.length > 0 && doctor.data_images[0])
            avatar = doctor.data_images[0];
          return {
            avatar: avatar,
            key: doctor.id,
            id: doctor.id,
            specialities: doctor.specialities.map(ele => ele.name).join(', '),
            name: doctor.name,
            phone: doctor.user ? doctor.user.phone : 'Chưa cung cấp',
            email: doctor.user ? doctor.user.email : 'Chưa cung cấp',
            place: doctor.place ? doctor.place : 'Chưa cung cấp',
            status: status
          }
        });
        this.setState({
          loading: false,
          totalPage: resp.total_page,
          page: page + 1,
          doctorList: resp.doctors,
          doctorListRender: doctorListRender
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });
  };

  render() {
    const {doctorListRender, totalPage, page, loading} = this.state;
    return (
      <div>
        <div className="option">
          <Input.Search
            placeholder="Gõ tên bác sĩ để lọc"
            onSearch={this.onInputChange}
            style={{width: 300, marginRight: '2rem'}}
          />
          <Select defaultValue="unregistered" style={{minWidth: '120px'}} onChange={this.handleChange}>
            <Select.Option value="unregistered">Chưa có người dùng quản lý</Select.Option>
            <Select.Option value="pending">Đang chờ phê duyệt</Select.Option>
            <Select.Option value="activated">Đã được phê duyệt</Select.Option>
          </Select>
        </div>
        <Table
          bordered
          scroll={{x: 1200}}
          pagination={{
            simple: true,
            total: totalPage,
            current: page - 1,
            onChange: this.fetchDoctor
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => this.onRowClicked(record, rowIndex)
            }
          }}
          loading={loading}
          columns={this.columns}
          dataSource={doctorListRender}
        />
      </div>
    );
  }
}

DoctorPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  token: PropTypes.string,
  history: PropTypes.object
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userData: state.auth.userData,
  token: state.auth.tokenData,
  isAdmin: state.auth.isAdmin
});

const mapDispatchToProps = dispatch => ({});


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorPage)
)
