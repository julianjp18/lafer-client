import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LogIn from '../components/Auth/LogIn';
import SignUp from '../components/Auth/SignUp';
import Landing from '../components/Landing';
import SecureCar from "../components/SecureCar";
import CustomQuote from "../components/SecureCar/CustomQuote";
import Quote from "../components/SecureCar/Quote";
import CompareQuote from "../components/SecureCar/Quote/CompareQuote";

const ROUTES = [
  { path: "/", key: "SOAT", exact: true, component: Landing, show: true },
  { path: "/log-in", key: "Iniciar sesión", exact: true, component: LogIn, show: true },
  { path: "/sign-up", key: "Registrarse", exact: true, component: SignUp, show: true },
  { path: "/secure-car", key: "Seguro para auto", exact: true, component: SecureCar, show: true },
  { path: "/custom-quote", key: "Cotización Personalizada", exact: true, component: CustomQuote, show: false },
  { path: "/quote-list", key: "Cotización", exact: true, component: Quote, show: false },
  { path: "/compare-quote", key: "Comparar lista seleccionada", exact: true, component: CompareQuote, show: false },
  {
    path: "/app",
    key: "APP",
    component: props => {
      if (!localStorage.getItem("user")) {
        alert("Proceso realizado con éxito");
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
    show: false,
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
