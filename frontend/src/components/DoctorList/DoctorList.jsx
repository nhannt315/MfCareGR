import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

import './DoctorList.scss';
import DoctorItem from './DoctorItem';

const DoctorList = props => {
  if (props.loading) {
    return (
      <ul>
        <li><Skeleton loading active avatar /></li>
        <li><Skeleton loading active avatar /></li>
        <li><Skeleton loading active avatar /></li>
        <li><Skeleton loading active avatar /></li>
        <li><Skeleton loading active avatar /></li>
        <li><Skeleton loading active avatar /></li>
        <li><Skeleton loading active avatar /></li>
        <li><Skeleton loading active avatar /></li>
        <li><Skeleton loading active avatar /></li>
        <li><Skeleton loading active avatar /></li>
      </ul>
    );
  }
  return (
    <ul>
      {props.doctorList.map(doctor => (
        <DoctorItem key={doctor.id} doctor={doctor} />
      ))}
    </ul>
  );
};

DoctorList.propTypes = {
  doctorList: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object
};

export default DoctorList;
