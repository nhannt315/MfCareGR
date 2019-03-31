import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Checkbox } from 'antd';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Editor.scss';

const Editor = ({onChange, onSubmit, submitting, value, cancelCallBack, isEditMode, onCheckBoxChange, checked}) => (
  <div className="editor">
    <Form.Item>
      <Input.TextArea rows={1} onChange={onChange} value={value} />
    </Form.Item>
    <Row>
      <Form.Item>
        <Button
          className="editor-element"
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          <i><FontAwesomeIcon icon="paper-plane" /></i>
          Gửi
        </Button>
        {isEditMode ? (
          <Button
            className="editor-element"
            htmlType="submit"
            onClick={cancelCallBack}
          >
            <i><FontAwesomeIcon icon="ban" /></i>
            Hủy
          </Button>
        ) : null}
        <Checkbox className="editor-element" onChange={onCheckBoxChange} checked={checked}>
          Giấu tên tôi
        </Checkbox>
      </Form.Item>
    </Row>
  </div>
);

Editor.propTypes = {
  onChange: PropTypes.func,
  onCheckBoxChange: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  value: PropTypes.string,
  cancelCallBack: PropTypes.func,
  isEditMode: PropTypes.bool,
  checked: PropTypes.bool
};

export default Editor;