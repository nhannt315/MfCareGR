import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Skeleton } from 'antd';

import CollapsibleBox from './CollapsibleBox';

class DoctorInfo extends PureComponent {
  render() {
    const {doctor, loading} = this.props;
    console.log(doctor);
    if (!doctor || loading) {
      return (
        <div id="thong-tin-chi-tiet">
          <Row>
            <Col xs={12} md={4}>
              <Skeleton loading paragraph={{rows: 5}} />
              <Skeleton loading paragraph={{rows: 5}} />
              <Skeleton loading paragraph={{rows: 5}} />
            </Col>
            <Col xs={12} md={4}>
              <Skeleton loading paragraph={{rows: 5}} />
              <Skeleton loading paragraph={{rows: 5}} />
              <Skeleton loading paragraph={{rows: 5}} />
            </Col>
            <Col xs={12} md={4}>
              <Skeleton loading paragraph={{rows: 5}} />
              <Skeleton loading paragraph={{rows: 5}} />
              <Skeleton loading paragraph={{rows: 5}} />
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <div id="thong-tin-chi-tiet">
        <Row>
          <Col xs={24} md={8} className="p-l-r">
            <CollapsibleBox
              contentType="info" title="Giới thiệu" icon="info-circle" strContent={doctor.info}
            />
          </Col>
          <Col xs={24} md={8} className="p-l-r">
            <CollapsibleBox
              contentType="list" title="Chức vụ" icon="briefcase" list={doctor.positions}
            />
            <CollapsibleBox
              contentType="list" title="Kinh nghiệm" icon="book" list={doctor.experiences}
            />
            <CollapsibleBox
              contentType="list" title="Giải thưởng và ghi nhận" icon="trophy" list={doctor.awards}
            />
          </Col>
          <Col xs={24} md={8} className="p-l-r">
            <CollapsibleBox
              contentType="list" title="Chuyên khoa" icon="stethoscope" list={doctor.specialities.map(i => i.name)}
            />
            <CollapsibleBox
              contentType="list" title="Dịch vụ" icon="list" list={doctor.medical_services.map(i => i.name)}
            />
            <CollapsibleBox
              contentType="list" title="Quá trình đào tạo" icon="graduation-cap" list={doctor.training_process}
            />
            <CollapsibleBox
              contentType="list" title="Ngôn ngữ" icon="globe" list={doctor.languages.map(i => i.name)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

DoctorInfo.propTypes = {
  doctor: PropTypes.object,
  loading: PropTypes.bool
};

export default DoctorInfo;