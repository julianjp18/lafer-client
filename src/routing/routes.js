import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LogIn from '../components/Auth/LogIn';
import SignUp from '../components/Auth/SignUp';
import Landing from '../components/Landing';
import StepsForm from '../components/Landing/StepsForm';

const ROUTES = [
  { path: "/", key: "ROOT", exact: true, component: Landing },
  { path: "/log-in", key: "log-in", exact: true, component: LogIn },
  { path: "/sign-up", key: "sign-up", exact: true, component: SignUp },
  { path: "/steps-form", key: "steps-form", exact: true, component: StepsForm },
  {
    path: "/app",
    key: "APP",
    component: props => {
      if (!localStorage.getItem("user")) {
        alert("You need to log in to access app routes");
        return <Redirect to={"/"} />;
      }
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>App Index</h1>,
      },
      {
        path: "/app/page",
        key: "APP_PAGE",
        exact: true,
        component: () => <h1>App Page</h1>,
      },
    ],
  },
];

export default ROUTES;

/**
 * Render a route with potential sub routes
 * https://reacttraining.com/react-router/web/example/route-config
 */
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
}

/**
* Use this component for any new section of routes (any config object that has a "routes" property
*/
export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}