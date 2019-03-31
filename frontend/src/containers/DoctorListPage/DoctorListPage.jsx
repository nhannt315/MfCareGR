import React, { PureComponent } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './DoctorListPage.scss';
import DoctorList from '../../components/DoctorList';
import DoctorService from '../../services/doctorService';
import SpecialityList from '../../components/SpecialityList';
import DoctorFilterBar from '../../components/DoctorFilterBar';

class DoctorListPage extends PureComponent {
  state = {
    filterData: {
      degrees: [],
      jobs: [],
      languages: [],
      provinces: [],
      ranks: [],
      specialities: []
    },
    doctorListLoading: false,
    doctorList: [],
    condition: {},
    error: null,
    currentPage: 0,
    perPage: 10,
    totalPage: 1,
    specialities: [],
    specialityLoading: false,
    conditionInfo: ''
  };

  componentDidMount() {
    this.fetchDoctors();
    DoctorService.getFilterData()
      .then(resp => {
        this.setState({filterData: resp});
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({specialityLoading: true});
    DoctorService.getSpecialities()
      .then(resp => {
        this.setState({specialityLoading: false, specialities: resp});
      })
      .catch(error => {
        this.setState({specialityLoading: false});
        console.log(error);
      });
  }

  updateCondition = (condition) => {
    this.setState({condition: condition, currentPage: 0}, () => this.fetchDoctors());
    let info = '';
    if (condition.speciality && condition.speciality.length > 0) {
      let specialities = this.state.filterData.specialities.filter(x => condition.speciality.includes(x.id));
      let specialityStr = specialities.map(ele => ele.name).reduce((accu, elem) => {
        return accu === null ? [elem] : [...accu, ', ', elem];
      }, null);
      info = info.concat(` có chuyên môn ${specialityStr}`);
    }

    if (condition.ranks && condition.ranks.length > 0) {
      let ranks = this.state.filterData.ranks.filter(x => condition.ranks.includes(x.id));
      let rankStr = ranks.map(ele => ele.name).reduce((accu, elem) => {
        return accu === null ? [elem] : [...accu, ', ', elem];
      }, null);
      info = info.concat(` có học hàm ${rankStr}`);
    }

    if (condition.language && condition.language.length > 0) {
      let languages = this.state.filterData.languages.filter(x => condition.language.includes(x.id));
      let languageStr = languages.map(ele => ele.name).reduce((accu, elem) => {
        return accu === null ? [elem] : [...accu, ', ', elem];
      }, null);
      info = info.concat(` có sử dụng ${languageStr}`);
    }

    if (condition.degrees && condition.degrees.length > 0){
      let degrees = this.state.filterData.degrees.filter(x => condition.degrees.includes(x.id));
      let degreeStr = degrees.map(ele => ele.name).reduce((accu, elem) => {
        return accu === null ? [elem] : [...accu, ', ', elem];
      }, null);
      info = info.concat(` có học vị ${degreeStr}`);
    }

    if (condition.place && condition.place.length > 0) {
      let places = this.state.filterData.provinces.filter(x => condition.place.includes(x.id));
      let placeString = places.map(ele => ele.name).reduce((accu, elem) => {
        return accu === null ? [elem] : [...accu, ', ', elem];
      }, null);
      info = info.concat(` tại ${placeString}`);
    }
    this.setState({conditionInfo: info});
  };

  fetchDoctors = (isPrev = false) => {
    const {currentPage, perPage, condition} = this.state;
    let nextPage = currentPage;
    nextPage = (isPrev && currentPage > 1) ? currentPage - 1 : currentPage + 1;
    this.setState({doctorListLoading: true});
    DoctorService.getDoctors(nextPage, perPage, condition)
      .then(resp => {
        this.setState({
          doctorList: resp.doctors,
          doctorListLoading: false,
          totalPage: resp.total_page,
          currentPage: nextPage
        });
      })
      .catch(error => {
        this.setState({error: error, doctorListLoading: false});
      });
  };

  render() {
    const {doctorList, doctorListLoading, error, specialities, specialityLoading, currentPage, totalPage, conditionInfo} = this.state;
    return (
      <React.Fragment>
        <div id="doctor-list-page-title" className="page-title">
          <div className="disease-background" />
          <div className="mask">
            <div className="container">
              <Breadcrumb style={{margin: '0 1.5rem'}}>
                <Breadcrumb.Item>
                  <Link to="/">Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/benh">Bác sĩ</Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <h1>
                Danh sách bác sĩ
                <span className="weak" style={{display: 'block'}}>
                  {conditionInfo}
                </span>
              </h1>
            </div>
          </div>
        </div>
        <div id="list" className="professionals has-aside">
          <div className="position">
            <div className="content">
              <DoctorFilterBar onConditionChange={this.updateCondition} filterData={this.state.filterData} />
              <DoctorList
                doctorList={doctorList}
                loading={doctorListLoading}
                error={error}
              />
              <div className="pagination">
                <span className="step-links">
                  {currentPage > 1 ?
                    <div className="prev-page" onClick={() => this.fetchDoctors(true)}>
                      <i><FontAwesomeIcon icon="chevron-left" /></i>
                      Trước
                    </div>
                    : null}
                  <span className="current">
                    {`Trang ${currentPage} / ${totalPage}  `}
                  </span>
                  {currentPage < totalPage ?
                    <div className="next-page" onClick={() => this.fetchDoctors()}>
                      Sau
                      <i><FontAwesomeIcon icon="chevron-right" /></i>
                    </div>
                    : null}
                </span>
              </div>
            </div>
            <SpecialityList list={specialities} loading={specialityLoading} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

DoctorListPage.propTypes = {};

export default DoctorListPage;
