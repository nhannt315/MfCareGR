import React, { PureComponent } from 'react';
import onClickOutside from 'react-onclickoutside';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './SuggestionBox.scss';

const DEFAULT_URL =
  'https://dwbxi9io9o7ce.cloudfront.net/build/f4706672a682503c789805d7368993ff.jpg';

class SuggestionBox extends PureComponent {
  handleClickOutside = () => {
    this.props.clearResult();
  };
  render() {
    const { article, disease, medicine, post, doctor, tag } = this.props.result;
    let articleElement = null;
    let doctorElement = null;
    let tagElement = null;
    let diseaseElement = null;
    let medicineElement = null;
    let postElement = null;
    if (tag.length > 0) {
      tagElement = (
        <li className="group disease">
          <h2>
            <Link to="/">
              <i>
                <FontAwesomeIcon icon="tags" />
              </i>
              Chủ đề
              <span className="view-all">
                Xem tất cả
                <i>
                  <FontAwesomeIcon icon="angle-double-right" />
                </i>
              </span>
            </Link>
          </h2>
          <ul className="list-unstyled">
            {tag.map(item => (
              <li key={item.id} className="item">
                <Link to={`/benh/${item.slug}`}>
                  <img className="image" alt={item.name} src={DEFAULT_URL} />
                  <span className="title">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }
    if (doctor.length > 0) {
      doctorElement = (
        <li className="group disease">
          <h2>
            <Link to="/">
              <i>
                <FontAwesomeIcon icon="user-md" />
              </i>
              Bác sĩ
              <span className="view-all">
                Xem tất cả
                <i>
                  <FontAwesomeIcon icon="angle-double-right" />
                </i>
              </span>
            </Link>
          </h2>
          <ul className="list-unstyled">
            {doctor.map(item => (
              <li key={item.id} className="item">
                <Link to={`/bac-si/${item.slug}`}>
                  <img
                    className="image"
                    alt={item.name}
                    src={
                      item.data_images.length > 0
                        ? item.data_images[0]
                        : DEFAULT_URL
                    }
                  />
                  <span className="title">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }
    if (article.length > 0) {
      articleElement = (
        <li className="group disease">
          <h2>
            <Link to="/">
              <i>
                <FontAwesomeIcon icon="newspaper" />
              </i>
              Bài viết
              <span className="view-all">
                Xem tất cả
                <i>
                  <FontAwesomeIcon icon="angle-double-right" />
                </i>
              </span>
            </Link>
          </h2>
          <ul className="list-unstyled">
            {article.map(item => (
              <li key={item.id} className="item">
                <Link to={`/bai-viet/${item.slug}`}>
                  <img
                    className="image"
                    alt={item.title}
                    src={item.medium_image}
                  />
                  <span className="title">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }
    if (disease.length > 0) {
      diseaseElement = (
        <li className="group disease">
          <h2>
            <Link to="/">
              <i>
                <FontAwesomeIcon icon="bed" />
              </i>
              Bệnh
              <span className="view-all">
                Xem tất cả
                <i>
                  <FontAwesomeIcon icon="angle-double-right" />
                </i>
              </span>
            </Link>
          </h2>
          <ul className="list-unstyled">
            {disease.map(item => (
              <li key={item.id} className="item">
                <Link to={`/benh/${item.slug}`}>
                  <img className="image" alt={item.name} src={item.images[0]} />
                  <span className="title">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }
    if (medicine.length > 0) {
      medicineElement = (
        <li className="group drug">
          <h2>
            <Link to="/">
              <i>
                <FontAwesomeIcon icon="toggle-on" />
              </i>
              Thuốc và dược chất
              <span className="view-all">
                Xem tất cả
                <i>
                  <FontAwesomeIcon icon="angle-double-right" />
                </i>
              </span>
            </Link>
          </h2>
          <ul className="list-unstyled">
            {medicine.map(item => (
              <li key={item.id} className="item">
                <Link to={`/thuoc/${item.slug}`}>
                  <img
                    className="image"
                    alt={item.name}
                    src={item.image ? item.image : DEFAULT_URL}
                  />
                  <span className="title">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }
    if (post.length > 0) {
      postElement = (
        <li className="group drug">
          <h2>
            <Link to="/">
              <i>
                <FontAwesomeIcon icon="comments" />
              </i>
              Câu hỏi
              <span className="view-all">
                Xem tất cả
                <i>
                  <FontAwesomeIcon icon="angle-double-right" />
                </i>
              </span>
            </Link>
          </h2>
          <ul className="list-unstyled">
            {post.map(item => (
              <li key={item.id} className="item">
                <Link to={`/benh/${item.slug}`}>
                  <img
                    className="image"
                    alt={item.body_raw.trunc(30)}
                    src={DEFAULT_URL}
                  />
                  <span className="title">{item.body_raw.trunc(40)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }
    return (
      <div className="suggestion" style={{ display: 'block' }}>
        <ul className="list-unstyled">
          {articleElement}
          {diseaseElement}
          {medicineElement}
          {doctorElement}
          {tagElement}
          {postElement}
        </ul>
      </div>
    );
  }
}

SuggestionBox.propTypes = {
  result: PropTypes.object,
  clearResult: PropTypes.func
};

export default onClickOutside(SuggestionBox);
