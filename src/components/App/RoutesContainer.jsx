/* eslint-disable react/jsx-props-no-spreading */
import { Skeleton } from 'antd';
import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ROOT_PATH } from '../../routing/paths';
import routes from '../../routing/routes';

const renderRoutes = (currentRole) =>
  routes.map(({ path, roles, component, ...routeParams }) => {
    if (!roles || roles.includes(currentRole)) {
      return (
        <Route
          exact
          key={path}
          path={path}
          component={component}
          {...routeParams}
        />
      );
    }

    return null;
  });

const RoutesContainer = ({ role }) => (
  <Suspense fallback={<Skeleton active />}>
    <Switch>
      {renderRoutes(role)}
      <Redirect to={ROOT_PATH} />
    </Switch>
  </Suspense>
);

RoutesContainer.propTypes = {
  role: PropTypes.string,
};

RoutesContainer.defaultProps = {
  role: null,
};

export default RoutesContainer;
