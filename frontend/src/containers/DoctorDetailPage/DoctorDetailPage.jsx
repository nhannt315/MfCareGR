import React, { PureComponent } from 'react';
import { message, Breadcrumb, Icon, Button, Row, Col } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import './DoctorDetailPage.scss';
import DoctorService from '../../services/doctorService';
import DoctorInfo from '../../components/DoctorInfo';
import DoctorQuestion from '../../components/DoctorQuestion';
import * as actions from '../../store/actions';

const DEFAULT_IMAGE = 'https://dwbxi9io9o7ce.cloudfront.net/build/f4706672a682503c789805d7368993ff.jpg';

class DoctorDetailPage extends PureComponent {

  state = {
    doctor: null,
    doctorLoading: false,
    doctorError: null,
    currentTab: 'info'
  };

  componentDidMount() {
    const slug = this.props.match.params.slug;
    document.title = 'Bác sĩ';
    this.setState({doctorLoading: true});
    this.props.clearThreadList();
    DoctorService.getDoctorDetail(slug)
      .then(resp => {
        this.setState({doctorLoading: false, doctor: resp});
        document.title = `${resp.job.name} ${resp.name}`;
      })
      .catch(error => {
        this.setState({doctorError: error, doctorLoading: false});
        message.error('Đã có lỗi xảy ra!');
      });
  }

  handleNavClick = (type) => {
    this.setState({currentTab: type});
  };

  render() {
    const {doctor, currentTab} = this.state;
    const imageUrl = doctor && doctor.data_images ? doctor.data_images[0] : DEFAULT_IMAGE;
    let tabContent = null;
    switch (currentTab) {
      case 'info':
        tabContent = <DoctorInfo doctor={this.state.doctor} loading={this.state.doctorLoading} />;
        break;
      case 'review':
        tabContent = null;
        break;
      case 'ask':
        tabContent = (
          <DoctorQuestion
            doctor={this.state.doctor} loading={this.state.doctorLoading} {...this.props} />
        );
        break;
      default:
        tabContent = null;
        break;
    }
    return (
      <div className="bg-light-gray">
        <div id="profile">
          <div className="profile-header p-t-sm p-b-sm border-bottom">
            <div className="container">
              <img className="doctor-image" src={imageUrl} alt="doctor" />
              <div className="profile-header-body">
                <Breadcrumb className="breadcrumb">
                  <Breadcrumb.Item><Link to="/"><Icon type="home" /></Link></Breadcrumb.Item>
                  <Breadcrumb.Item><Link to="/tra-cuu">Tra cứu</Link></Breadcrumb.Item>
                  <Breadcrumb.Item><Link to="/danh-sach-bac-si">Bác sĩ</Link></Breadcrumb.Item>
                </Breadcrumb>
                <h1>{doctor && `${doctor.job.name} ${doctor.name}`}</h1>
                <span className="text-pink vote-list">
                  <strong>14 Hài lòng</strong>
                  <i><Icon type="like" style={{marginLeft: '4px'}} /></i>
                </span>
                <div className="tab-content-link">Đánh giá chi tiết</div>
              </div>
              <div className="pull-right btn-group text-right">
                <Button shape="round" icon="user-add" size="small">Theo dõi</Button>
                <Button shape="round" icon="book" size="small">Ghi nhớ</Button>
              </div>
            </div>
          </div>
          <nav className="bg-white m-b-sm text-right">
            <div className="container no-paddings">
              <ul className="nav-tabs hover-underline list-inline list-unstyled">
                <li>
                  <div
                    className={`link ${currentTab === 'info' && 'active'}`}
                    onClick={() => this.handleNavClick('info')}>
                    Thông tin chi tiết
                  </div>
                </li>
                <li>
                  <div
                    className={`link ${currentTab === 'review' && 'active'}`}
                    onClick={() => this.handleNavClick('review')}>
                    Nhận xét
                  </div>
                </li>
                <li>
                  <div
                    className={`link ${currentTab === 'ask' && 'active'}`}
                    onClick={() => this.handleNavClick('ask')}>
                    <i style={{marginRight: '5px'}}><FontAwesomeIcon icon="comments" /></i>
                    Hỏi đáp
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <Row>
              <Col x2={24} md={24} lg={24}>
                <div className="min-page-height clearfix">
                  <div className="tab-content-container">
                    {tabContent}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    threadList: state.thread.threadList,
    isFetchingList: state.thread.isFetchingList,
    threadListError: state.thread.error,
    threadPage: state.thread.page,
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.userData,
    token: state.auth.tokenData,
    hasMoreThread: state.thread.hasMore
  };
};


DoctorDetailPage.propTypes = {
  match: PropTypes.object,
  threadList: PropTypes.array,
  isFetchingList: PropTypes.bool,
  threadListError: PropTypes.object,
  threadPage: PropTypes.number,
  getThreadList: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  userData: PropTypes.object,
  token: PropTypes.string,
  addToThreadList: PropTypes.func,
  updateThreadList: PropTypes.func,
  updateTagThread: PropTypes.func,
  updateLikeThread: PropTypes.func,
  clearThreadList: PropTypes.func,
  hasMoreThread: PropTypes.bool
};

const mapDispatchToProps = dispatch => {
  return {
    getThreadList: (page, tagIds = [], doctorId) => dispatch(actions.getThreadList(page, tagIds, doctorId)),
    addToThreadList: (thread) => dispatch(actions.addToThreadList(thread)),
    updateThreadList: (thread) => dispatch(actions.updateThreadList(thread)),
    updateTagThread: (threadId, tag, action) => dispatch(actions.updateTagThread(action, threadId, tag)),
    updateLikeThread: (action, threadId, userId) => dispatch(actions.updateLikeStatus(action, threadId, userId)),
    clearThreadList: () => dispatch(actions.clearThreadList())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    DoctorDetailPage
  )
);