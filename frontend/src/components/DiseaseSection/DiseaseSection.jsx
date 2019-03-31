import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './DiseaseSection.scss';

class DiseaseSection extends React.PureComponent {
  render() {
    const {character, diseaseList, scrollToTop} = this.props;
    return (
      <section id={character} className="disease-body">
        <h3>{character}</h3>
        <ul>
          {diseaseList.map(disease => (
            <li key={disease.id}><Link to={`/benh/${disease.slug}`}>{disease.name}</Link></li>
          ))}
        </ul>
        <span className="back-to-top" onClick={scrollToTop}>
          <div>Trờ về đầu trang</div>
          <i><FontAwesomeIcon icon="arrow-circle-up" /></i>
        </span>
      </section>
    );
  }
}

DiseaseSection.propTypes = {
  character: PropTypes.string,
  diseaseList: PropTypes.array,
  scrollToTop: PropTypes.func
};

export default DiseaseSection;
