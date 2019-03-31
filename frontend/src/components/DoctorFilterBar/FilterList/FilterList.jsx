import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';

import './FilterList.scss';

class FilterList extends PureComponent {
  onCheckBoxChange = (checkedValues) => {
    this.props.onChange(this.props.type, checkedValues);
  };

  render() {
    const options = this.props.list.map(item => ({label: item.name, value: item.id}));
    return (
      <Checkbox.Group options={options} onChange={this.onCheckBoxChange} value={this.props.value}>
      </Checkbox.Group>
    );
  }
}

FilterList.propTypes = {
  list: PropTypes.array,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.array
};

export default FilterList;