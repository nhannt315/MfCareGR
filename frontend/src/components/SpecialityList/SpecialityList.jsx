import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BulletList } from 'react-content-loader';

import './SpecialityList.scss';

const MyComponent = props => {
  if (props.loading) {
    return (
      <aside id="specialities">
        <section>
          <BulletList />
          <BulletList />
          <BulletList />
        </section>
      </aside>
    );
  }
  return (
    <aside id="specialities">
      <section>
        <h3>Chuyên khoa</h3>
        <dl>
          {props.list.map(item => (
            <dt key={item.id}>
              <Link to="/">
                <h5>{item.name}</h5>
                <span className="thread-count">{item.doctor_count} bác sĩ</span>
              </Link>
            </dt>
          ))}
        </dl>
      </section>
    </aside>
  );
};

MyComponent.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool
};

export default MyComponent;
