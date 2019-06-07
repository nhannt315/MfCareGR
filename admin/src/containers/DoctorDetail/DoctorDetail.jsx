import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { message, Tabs, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './DoctorDetail.less';
import DoctorService from '../../services/doctorService';
import Page from '../../components/Page';
import DoctorDetailForm from '../../components/DoctorDetailForm';

const {TabPane} = Tabs;

class DoctorDetail extends PureComponent {

  state = {
    filterData: {
      degrees: [],
      jobs: [],
      languages: [],
      provinces: [],
      ranks: [],
      specialities: []
    },
    doctor: null,
    loading: false,
    infoEdit: false
  };

  componentDidMount() {
    const doctorId = this.props.match.params.id;
    this.setState({loading: true});
    DoctorService.getFilterData()
      .then(resp => {
        this.setState({filterData: resp});
      })
      .catch(error => {
        console.log(error);
        message.error('Đã có lỗi xảy ra khi lấy dữ liệu!');
      });
    DoctorService.getDoctorDetail(doctorId, this.props.token)
      .then(resp => {
        this.setState({doctor: resp, loading: false});
        console.log(resp);
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
        message.error('Đã có lỗi xảy ra khi lấy dữ liệu!');
      })
  }

  operations = () => {
    let renderElement = null;
    if (this.state.infoEdit) {
      renderElement = <Button shape="round" onClick={() => this.setState({infoEdit: false})}>Hủy</Button>
    } else {
      renderElement = <Button shape="round" onClick={() => this.setState({infoEdit: true})}>Chỉnh sửa</Button>
    }
    return renderElement;
  };

  updateDoctor = (values) => {
    this.setState({loading: true});
    DoctorService.updateDoctor(this.state.doctor.id, this.props.token, values)
      .then(resp => {
        this.setState({doctor: resp, loading: false, infoEdit: false});
        message.success('Cập nhật thành công!');
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false, infoEdit: false});
        message.error('Cập nhật thông tin thất bại1');
      })
  };

  approve = () => {
    const {doctor} = this.state;
    if (!doctor) return;
    DoctorService.approveDoctor(doctor.id, this.props.token)
      .then(resp => message.success('Đã phê duyệt thành công!'))
      .catch(error => {
        console.log(error);
        message.error('Có lỗi xảy ra');
      });
  };

  decline = () => {
    const {doctor} = this.state;
    if (!doctor) return;
    DoctorService.declineDoctor(doctor.id, this.props.token)
      .then(resp => message.success('Đã phê duyệt thành công!'))
      .catch(error => {
        console.log(error);
        message.error('Có lỗi xảy ra');
      });
  };

  render() {
    const {loading, doctor, filterData, infoEdit} = this.state;
    const operation = this.operations();
    return (
      <Page loading={loading}>
        <Tabs tabBarExtraContent={operation}>
          <TabPane tab="Thông tin cơ bản" key={1}>
            {doctor &&
            (
              <React.Fragment>
                <DoctorDetailForm filterData={filterData} handleSubmit={this.updateDoctor}
                                  approve={this.approve} decline={this.decline} isEdit={infoEdit}
                                  doctor={doctor} />

              </React.Fragment>
            )}
          </TabPane>
        </Tabs>
      </Page>
    );
  }
}

DoctorDetail.propTypes = {
  token: PropTypes.string
};

const mapStateToProps = state => ({
  token: state.auth.tokenData
});

export default withRouter(
  connect(mapStateToProps, null)(DoctorDetail)
);