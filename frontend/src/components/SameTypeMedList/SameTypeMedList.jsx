import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import './SameTypeMedList.scss';

const SameTypeMedList = props => {
  return (
    <section className="top-list-same-type drug-collection">
      <h3>Các thuốc liên quan</h3>
      <ul className="border-bottom">
        {props.medicineList.map(medicine => (
          <li key={medicine.id}>
            <div className="content-collection">
              <Link to={`/thuoc/${medicine.slug}`} className="drug-icon" />
              <div className="body">
                <h4>
                  <Link to={`/thuoc/${medicine.slug}`}>{medicine.name}</Link>
                </h4>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Link to={`/thuoc/danh-sach?drug_type=${props.medicineTypeSlug}`} className="view-more">
        Xem thêm
      </Link>
    </section>
  );
};

SameTypeMedList.propTypes = {
  medicineList: PropTypes.array,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  medicineTypeSlug: PropTypes.string
};

export default SameTypeMedList;
