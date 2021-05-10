import React from "react";
import { Route, Switch } from "react-router-dom";

import Landing from '../components/Landing';
import SuccessPayment from "../components/Payments/SuccessPayment/index";
import FailurePayment from "../components/Payments/FailurePayment/index";
import PendingPayment from "../components/Payments/PendingPayment/index";
import AbortPayment from "../components/Payments/AbortPayment/index";
import FirstForm from "../components/SOAT/StepsForm/FirstForm/index";
import SecondForm from "../components/SOAT/StepsForm/SecondForm";
import ThirdForm from "../components/SOAT/StepsForm/ThirdForm";

const ROUTES = [
  { path: "/success-payment", key: "Success payment", exact: true, component: SuccessPayment, show: false, auth: false, },
  { path: "/failure-payment", key: "Failure payment", exact: true, component: FailurePayment, show: false, auth: false, },
  { path: "/pending-payment", key: "Pending payment", exact: true, component: PendingPayment, show: false, auth: false, },
  { path: "/abort-payment", key: "Abort payment", exact: true, component: AbortPayment, show: false, auth: false, },
  // { path: "/countries", key: "Países", exact: true, component: Countries, show: false, auth: true },
  // { path: "/", key: "Inicio", exact: true, component: Landing, show: true, auth: false },
  { path: "/", key: "Home", exact: true, component: Landing, show: true, auth: false },
  { path: "/noticias", key: "Noticias", exact: true, component: Landing, show: true, auth: false },
  //{ path: "/profile", key: "Mi perfil", exact: true, component: Landing, show: false, auth: true },
  // { path: "/secure-car", key: "Seguro para auto", exact: true, component: SecureCar, show: false, auth: false },
  // { path: "/contact-us", key: "Contáctanos", exact: true, component: SignUp, show: false, auth: false },
  // { path: "/blogs", key: "Blog", exact: true, component: LogIn, show: false, auth: false },
  // { path: "/log-in", key: "Iniciar sesión", exact: true, component: LogIn, show: false, auth: false },
  // { path: "/sign-up", key: "Registrarse", exact: true, component: SignUp, show: false, auth: false },
  { path: "/soat-vehicle-information", key: "SOAT step 1", exact: true, component: FirstForm, show: false, auth: false },
  { path: "/soat-secure-information", key: "SOAT step 2", exact: true, component: SecondForm, show: false, auth: false },
  { path: "/soat-payment-information", key: "SOAT step 3", exact: true, component: ThirdForm, show: false, auth: false },
  // { path: "/custom-quote", key: "Cotización Personalizada", exact: true, component: CustomQuote, show: false },
  // { path: "/quote-list", key: "Cotización", exact: true, component: Quote, show: false },
  // { path: "/compare-quote", key: "Comparar lista seleccionada", exact: true, component: CompareQuote, show: false },
  // { path: "/dashboard", key: "dashboard", exact: true, component: () => <h1>Dashboard</h1>, show: false, auth: true, },
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
      <Route component={() => <h1 style={{ textAlign: 'center' }}>¡UPS! Sitio web no encontrado.</h1>} />
    </Switch>
  );
}
