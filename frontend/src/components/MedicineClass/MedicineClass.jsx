import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './MedicineClass.scss';


class MedicineClass extends PureComponent {
  render() {
    const {name, medicineTypes} = this.props;
    return (
      <div className="medicine-class-item">
        <div>
          <h3>{name}</h3>
          <div>
            <ul>
              {medicineTypes.map(type =>
                <li key={type.id}>
                  <Link to={`/thuoc/danh-sach/?drug_type=${type.slug}`}>{type.name}</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

MedicineClass.propTypes = {
  name: PropTypes.string,
  medicineTypes: PropTypes.array
};

export default MedicineClass;