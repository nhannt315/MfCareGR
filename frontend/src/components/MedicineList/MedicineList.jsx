import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';

import MedicineItem from './MedicineItem';
import './MedicineList.scss';

const masonryOptions = {
  itemSelector:'.medicine-item',
  columnWidth: 1
};

const MedicineList = props => {
  const {medicineList} = props;
  return (
    <Masonry className="medicine-list" options={masonryOptions}>
      {medicineList.map(medicine => {
        return <MedicineItem key={medicine.id} medicine={medicine} />;
      })}
    </Masonry>
  );
};

MedicineList.propTypes = {
  medicineList: PropTypes.array
};

export default MedicineList;
