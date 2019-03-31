import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './DoctorFilterBar.scss';
import FilterButton from './FilterButton';
import FilterModal from './FilterModal';
import DoctorService from '../../services/doctorService';

class DoctorFilterBar extends PureComponent {

  state = {
    modalVisible: false,
    filterType: 'place',
    condition: {
      place: [],
      speciality: [],
      job: [],
      language: [],
      ranks: [],
      degrees: []
    },
    tmpCondition: {
      place: [],
      speciality: [],
      job: [],
      language: [],
      ranks: [],
      degrees: []
    }
  };

  componentDidMount() {

  }

  handleButtonClick = (type) => {
    this.setState({filterType: type});
    this.setState({modalVisible: true});
  };

  handleModalOk = () => {
    const condition = this.state.tmpCondition;
    this.setState({condition: condition, modalVisible: false});
    this.props.onConditionChange(condition);
  };

  onValueChange = (type, value) => {
    const oldCondition = this.state.tmpCondition;
    let newCondition = {...oldCondition};
    newCondition[type] = value;
    this.setState({tmpCondition: newCondition});
  };

  render() {
    return (
      <React.Fragment>
        <FilterModal
          visible={this.state.modalVisible} onOk={this.handleModalOk}
          onCancel={() => this.setState({modalVisible: false})}
          filterData={this.props.filterData}
          type={this.state.filterType}
          onTypeChange={(type) => this.setState({filterType: type})}
          condition={this.state.tmpCondition}
          onValueChange={this.onValueChange}
        />
        <div id="doctor-filter-bar">
          {/*<h3>Bộ lọc <span><i><FontAwesomeIcon icon="filter" /></i></span></h3>*/}
          <FilterButton iconName="map-marker" title="Vị trí" onClick={this.handleButtonClick} type="place" />
          <FilterButton iconName="stethoscope" title="Chuyên khoa" onClick={this.handleButtonClick} type="speciality" />
          <FilterButton iconName="user-md" title="Nghề nghiệp" onClick={this.handleButtonClick} type="job" />
          <FilterButton iconName="language" title="Ngôn ngữ" onClick={this.handleButtonClick} type="language" />
          <FilterButton iconName="graduation-cap" title="Học hàm" onClick={this.handleButtonClick} type="ranks" />
          <FilterButton iconName="graduation-cap" title="Học vị" onClick={this.handleButtonClick} type="degrees" />
        </div>
      </React.Fragment>
    );
  }
}

DoctorFilterBar.propTypes = {
  filterData: PropTypes.object,
  onConditionChange: PropTypes.func
};

export default DoctorFilterBar;