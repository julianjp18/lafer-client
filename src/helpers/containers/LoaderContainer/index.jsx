import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { feedbackLoaderActiveSelector } from '../../../redux/reducers/feedbackReducer/feedbackSelectors';
import Loader from './Loader';
import './LoaderContainer.scss';

const LoaderContainer = ({ loaderActive }) => {
  const renderLoader = () => (loaderActive ? <Loader /> : null);

  return renderLoader();
};

LoaderContainer.propTypes = {
  loaderActive: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loaderActive: feedbackLoaderActiveSelector(state),
});

export default connect(mapStateToProps)(LoaderContainer);
