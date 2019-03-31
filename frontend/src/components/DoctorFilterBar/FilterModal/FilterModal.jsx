import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FilterModal.scss';
import FilterList from '../FilterList';

const TabPane = Tabs.TabPane;


class FilterModal extends PureComponent {

  state = {
    defaultKey: 'place',
    condition: {}
  };

  componentDidUpdate() {
    this.setState({defaultKey: this.props.type});
  }

  onTabChange = (activeKey) => {
    this.setState({defaultKey: activeKey});
    this.props.onTypeChange(activeKey);
  };


  render() {
    const {visible, onOk, condition, onCancel, filterData, onValueChange} = this.props;
    return (
      <Modal
        className="modal-filter" width={800} title="Bộ lọc nâng cao" visible={visible} onOk={onOk}
        onCancel={onCancel}>
        <Tabs
          defaultActiveKey="place" activeKey={this.state.defaultKey} size="small" tabBarGutter={5}
          onChange={this.onTabChange}>
          <TabPane tab={<span><i><FontAwesomeIcon icon="map-marker" /></i>Vị trí</span>} key="place">
            <FilterList list={filterData.provinces} type="place" onChange={onValueChange} value={condition.place} />
          </TabPane>
          <TabPane tab={<span><i><FontAwesomeIcon icon="stethoscope" /></i>Chuyên khoa</span>} key="speciality">
            <FilterList
              list={filterData.specialities} type="speciality" onChange={onValueChange}
              value={condition.speciality} />
          </TabPane>
          <TabPane tab={<span><i><FontAwesomeIcon icon="user-md" /></i>Nghề nghiệp</span>} key="job">
            <FilterList
              list={filterData.jobs} type="job" onChange={onValueChange} value={condition.job} />
          </TabPane>
          <TabPane tab={<span><i><FontAwesomeIcon icon="language" /></i>Ngôn ngữ</span>} key="language">
            <FilterList
              list={filterData.languages} type="language" onChange={onValueChange}
              value={condition.language} />
          </TabPane>
          <TabPane tab={<span><i><FontAwesomeIcon icon="graduation-cap" /></i>Học hàm</span>} key="ranks">
            <FilterList list={filterData.ranks} type="ranks" onChange={onValueChange} value={condition.ranks} />
          </TabPane>
          <TabPane tab={<span><i><FontAwesomeIcon icon="graduation-cap" /></i>Học vị</span>} key="degrees">
            <FilterList list={filterData.degrees} type="degrees" onChange={onValueChange} value={condition.degrees} />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}


FilterModal.propTypes = {
  type: PropTypes.string,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  condition: PropTypes.object,
  onCancel: PropTypes.func,
  filterData: PropTypes.object,
  onTypeChange: PropTypes.func,
  onValueChange: PropTypes.func
};

export default FilterModal;