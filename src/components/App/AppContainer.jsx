import { ConfigProvider, Layout } from 'antd';
import esEs from 'antd/es/locale/es_ES';
import PropTypes, { bool } from 'prop-types';
import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import LoaderContainer from '../../helpers/containers/LoaderContainer';
import Loader from '../../helpers/containers/LoaderContainer/Loader';
import ModalContainer from '../../helpers/containers/ModalContainer';
import Header from '../../helpers/layouts/Header';
import PrivateMenu from '../../helpers/layouts/PrivateLayout/Menu';
import { authSelector } from '../../redux/reducers/authReducer/authSelectors';
import { verifyTokenNotifier } from '../../redux/sagas/devise/actions/verifyToken';
import RoutesContainer from './RoutesContainer';

const AppContainer = ({
  verifyToken,
  auth: { token, role, verified },
  clearSpaces,
  headerVisible,
}) => {
  useEffect(() => {
    verifyToken();
  }, []);

  if (!verified && localStorage.getItem('token')) {
    return <Loader initial />;
  }

  const renderHeader = () => token && headerVisible && <Header />;
  const renderMenu = () => token && <PrivateMenu role={role} />;

  const layoutClasses = () => {
    let classes = '';
    if (token) classes += 'logged ';
    if (clearSpaces) classes += 'clear-spaces ';
    if (!headerVisible) classes += 'header-no-visible ';
    if (role) classes += role;
    return classes;
  };

  return (
    <ConfigProvider locale={esEs}>
      <Layout className={layoutClasses()}>
        <LoaderContainer />
        <ModalContainer />
        {renderHeader()}
        <Layout>
          {renderMenu()}
          <Layout>
            <Layout.Content>
              <RoutesContainer role={role} />
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

AppContainer.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.string,
    verified: PropTypes.bool,
  }).isRequired,
  clearSpaces: bool,
  headerVisible: bool,
};

AppContainer.defaultProps = {
  clearSpaces: false,
  headerVisible: true,
};

const mapStateToProps = (state) => ({
  auth: authSelector(state),
  clearSpaces: state.layout.clearSpaces,
  headerVisible: state.layout.header.visible,
});

const mapDispatchToProps = {
  verifyToken: verifyTokenNotifier,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(AppContainer));
