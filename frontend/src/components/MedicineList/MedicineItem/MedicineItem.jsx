import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import medicineHolder from '../../../assets/images/medicine.png';

import './MedicineItem.scss';

const MedicineItem = props => {
  const {medicine} = props;
  return (
    <div className="medicine-item">
      <Link to={`/thuoc/${medicine.slug}`} className="c-media">
        <img
          className="c-media__image c-media__image--drug"
          src={medicine.image ? medicine.image : medicineHolder}
          alt={medicine.name}
        />
        <div className="c-media__body">
          <span className="c-media__title">{medicine.name}</span>
          <div className="c-media__content">{medicine.company}</div>
        </div>
      </Link>
    </div>
  );
};

MedicineItem.propTypes = {
  medicine: PropTypes.object
};

export default MedicineItem;
