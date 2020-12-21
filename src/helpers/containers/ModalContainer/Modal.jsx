/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal } from 'antd';

// const mobile = window.innerWidth <= 576;

const Modal = ({
  content: Content,
  props,
  configurations: {
    footer,
    onOk,
    onCancel,
    maskClosable,
    width,
    getContainer,
    ...rest
  },
}) => (
  <AntdModal
    footer={footer}
    width={width}
    onOk={onOk}
    onCancel={onCancel}
    getContainer={getContainer || '#root'}
    maskClosable={maskClosable}
    {...rest}
    visible
  >
    <Content onCancel={onCancel} {...props} />
  </AntdModal>
);

Modal.propTypes = {
  content: PropTypes.elementType.isRequired,
  props: PropTypes.objectOf(PropTypes.any),
  configurations: PropTypes.shape({
    footer: PropTypes.element,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    maskClosable: PropTypes.bool,
    width: PropTypes.number,
    getContainer: PropTypes.string,
  }).isRequired,
};

Modal.defaultProps = {
  props: {},
};

export default Modal;
