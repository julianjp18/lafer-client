import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { feedbackModalSelector } from '../../../redux/reducers/feedbackReducer/feedbackSelectors';
import Modal from './Modal';

const ModalContainer = ({
  modal: { modalContent, modalProps, modalConfigurations },
  hideModal,
}) => {
  if (!modalContent) {
    return null;
  }

  const configurations = {
    footer: null,
    onOk: hideModal,
    onCancel: hideModal,
    maskClosable: true,
    width: 720,
    ...modalConfigurations,
  };

  return (
    <Modal
      configurations={configurations}
      props={{ ...modalProps }}
      content={modalContent}
    />
  );
};

ModalContainer.propTypes = {
  modal: PropTypes.shape({
    modalContent: PropTypes.any,
    modalProps: PropTypes.objectOf(PropTypes.any),
    modalConfigurations: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  hideModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: feedbackModalSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ModalContainer));
