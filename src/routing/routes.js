import React from "react";
import { Route, Switch } from "react-router-dom";

import LogIn from '../components/Auth/LogIn';
import SignUp from '../components/Auth/SignUp';
import Landing from '../components/Landing';
import SecureCar from "../components/SecureCar";
import CustomQuote from "../components/SecureCar/CustomQuote";
import Quote from "../components/SecureCar/Quote";
import CompareQuote from "../components/SecureCar/Quote/CompareQuote";
import Countries from "../components/Admin/Countries";
import MainActivities from "../components/Admin/MainActivities"
import MediumResponses from "../components/Admin/MediumResponses"
import LinkClasses from "../components/Admin/LinkClasses";
import PQRContacts from "../components/Admin/PQRContacts";
import TypeActivities from "../components/Admin/TypeActivities";
import Products from "../components/Admin/Products";
import Insurers from "../components/Admin/Insurers";
import TypeOperations from "../components/Admin/TypeOperations";
import TypeIndustries from "../components/Admin/TypeIndustries";
import TypeIdentification from "../components/Admin/TypeIdentifications";
import TypeCompanies from "../components/Admin/TypeCompanies";
import RequestTypes from "../components/Admin/RequestTypes";
import StepsForm from "../components/SOAT/StepsForm";
import SuccessPayment from "../components/Payments/SuccessPayment";
import FailurePayment from "../components/Payments/FailurePayment";
import PendingPayment from "../components/Payments/PendingPayment";
import AbortPayment from "../components/Payments/AbortPayment";
import SOAT from "../components/SOAT";

const ROUTES = [
  { path: "/success-payment", key: "Success payment", exact: true, component: SuccessPayment, show: false, auth: false, },
  { path: "/failure-payment", key: "Failure payment", exact: true, component: FailurePayment, show: false, auth: false, },
  { path: "/pending-payment", key: "Pending payment", exact: true, component: PendingPayment, show: false, auth: false, },
  { path: "/abort-payment", key: "Abort payment", exact: true, component: AbortPayment, show: false, auth: false, },
  { path: "/countries", key: "Países", exact: true, component: Countries, show: false, auth: true },
  { path: "/", key: "Inicio", exact: true, component: Landing, show: true, auth: false },
  { path: "/soat", key: "SOAT", exact: true, component: SOAT, show: true, auth: false },
  { path: "/profile", key: "Mi perfil", exact: true, component: Landing, show: false, auth: true },
  { path: "/secure-car", key: "Seguro para auto", exact: true, component: SecureCar, show: true, auth: false },
  { path: "/contact-us", key: "Contáctanos", exact: true, component: SignUp, show: true, auth: false },
  { path: "/blogs", key: "Blog", exact: true, component: LogIn, show: true, auth: false },
  { path: "/log-in", key: "Iniciar sesión", exact: true, component: LogIn, show: true, auth: false },
  { path: "/sign-up", key: "Registrarse", exact: true, component: SignUp, show: true, auth: false },
  { path: "/steps-form", key: "pasos SOAT", exact: true, component: StepsForm, show: false, auth: false },
  { path: "/custom-quote", key: "Cotización Personalizada", exact: true, component: CustomQuote, show: false },
  { path: "/quote-list", key: "Cotización", exact: true, component: Quote, show: false },
  { path: "/compare-quote", key: "Comparar lista seleccionada", exact: true, component: CompareQuote, show: false },
  { path: "/dashboard", key: "dashboard", exact: true, component: () => <h1>Dashboard</h1>, show: false, auth: true, },
  { path: "/main-activities", key: "Main Activities", exact: true, component: MainActivities, show: false, auth: true },
  { path: "/medium-responses", key: "Medium Responses", exact: true, component: MediumResponses, show: false, auth: true },
  { path: "/link-classes", key: "Link Classes", exact: true, component: LinkClasses, show: false, auth: true },
  { path: "/PQR-contacts", key: "PQR Contacts", exact: true, component: PQRContacts, show: false, auth: true },
  { path: "/type-activities", key: "Type Activities", exact: true, component: TypeActivities, show: false, auth: true },
  { path: "/products", key: "Products", exact: true, component: Products, show: false, auth: true },
  { path: "/insurers", key: "Insurers", exact: true, component: Insurers, show: false, auth: true },
  { path: "/type-operations", key: "Type Operations", exact: true, component: TypeOperations, show: false, auth: true },
  { path: "/type-industries", key: "Type Industries", exact: true, component: TypeIndustries, show: false, auth: true },
  { path: "/type-identification", key: "Type Identification", exact: true, component: TypeIdentification, show: false, auth: true },
  { path: "/type-companies", key: "Type Companies", exact: true, component: TypeCompanies, show: false, auth: true },
  { path: "/request-types", key: "Request Types", exact: true, component: RequestTypes, show: false, auth: true },  
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
      <Route component={() => <h1>¡UPS! Sitio web no encontrado.</h1>} />
    </Switch>
  );
}
