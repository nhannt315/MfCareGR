import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './DoctorItem.scss';

const DEFAULT_URL =
  'https://dwbxi9io9o7ce.cloudfront.net/build/f4706672a682503c789805d7368993ff.jpg';

const DoctorItem = props => {
  const doctor = props.doctor;
  const url = `/bac-si/${doctor.slug}`;
  return (
    <li>
      <div className="media">
        <img
          className="doctor-image"
          src={doctor.data_images[0] ? doctor.data_images[0] : DEFAULT_URL}
          alt={doctor.name}
        />
      </div>
      <div className="doctor-body">
        <div className="info">
          <h2>
            <Link to={url}>{`${doctor.job.name} ${doctor.name}`}</Link>
          </h2>
          <div className="desc">
            {doctor.info.trunc(80)}
            <Link to={url} className="readmore">
              Xem tiếp
              <i>
                <FontAwesomeIcon icon="angle-double-right" />
              </i>
            </Link>
          </div>
          <div className="brief">
            <dt><FontAwesomeIcon icon="graduation-cap" /></dt>
            <dd>
              {
                doctor.degrees.map(degree => (
                  <Link key={degree.id} to="/">{degree.name}</Link>))
                  .reduce((accu, elem) => {
                    return accu === null ? [elem] : [...accu, ', ', elem];
                  }, null)
              }
              {doctor.degrees.length > 0 && doctor.ranks.length > 0 && ', '}
              {
                doctor.ranks.length > 0 &&
                doctor.ranks.map(rank => (
                  <Link key={rank.id} to="/">{rank.name}</Link>))
                  .reduce((accu, elem) => {
                    return accu === null ? [elem] : [...accu, ', ', elem];
                  }, null)
              }
            </dd>
            <dt><FontAwesomeIcon icon="stethoscope" /></dt>
            <dd>{
              doctor.specialities.map(item => (
                <Link key={item.id} to="/">{item.name}</Link>
              )).reduce((accu, elem) => {
                return accu === null ? [elem] : [...accu, ', ', elem];
              }, null)
            }</dd>
            <dt><FontAwesomeIcon icon="book" /></dt>
            <dd>
              {
                doctor.experiences.map(item => (
                  <Link key={item} to="/">{item}</Link>
                ))
                  .reduce((accu, elem) => {
                    return accu === null ? [elem] : [...accu, ', ', elem];
                  }, null)
              }
            </dd>
          </div>
        </div>
      </div>
    </li>
  );
};

DoctorItem.propTypes = {
  doctor: PropTypes.object
};

export default DoctorItem;
