import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SiendoSeguroNav from '../../assets/images/siendo-seguro-nav.svg';
import ROUTES from "../../routing/routes";
import './menu.scss';

function Menu({ goHome }) {
  const [isToggle, setisToggle] = useState(false);
  const history = useHistory();

  const burgerOnClick = () => {
    setisToggle(!isToggle);
  };

  const onClickImage = () => {
    history.push('/');
    goHome();
  };

  return (
    <div className='navbar'>
      <img
        alt=""
        src={SiendoSeguroNav}
        onClick={onClickImage}
      />
    </div>
  )
};

/**
 * Render a nested hierarchy of route configs with unknown depth/breadth
 */
const displayRouteMenu = (routes) => {
  /**
   * Render a single route as a list item link to the config's pathname
   */
  const singleRoute = (route) => {
    return route.show && !route.auth && (
      <li key={route.path} className="menu-item">
        <Link to={route.path} className="menu-link">{route.key}</Link>
      </li>
    );
  }

  const dropDownRoute = (route) => {
    return (
      <li key={route.path} className="menu-item">
        <Link to={route.path} className="menu-link">{route.key}</Link>
      </li>
    )
  };

  // loop through the array of routes and generate an unordered list
  return (routes.map(route => {
    // if this route has sub-routes, then show the ROOT as a list item and recursively render a nested list of route links
    if (route.routes) {
      return (singleRoute(route));
    }

    // no nested routes, so just render a single route
    return singleRoute(route);
  })
  );
};

const displayAuthRouteMenu = (routes) => {
  /**
   * Render a single route as a list item link to the config's pathname
   */
  const singleRoute = (route) => {
    return route.auth && (
      <li key={route.path} className="menu-item">
        <Link to={route.path} className="menu-link">{route.key}</Link>
      </li>
    );
  }

  const dropDownRoute = (route) => {
    return (
      <li key={route.path} className="menu-item">
        <Link to={route.path} className="menu-link">{route.key}</Link>
      </li>
    )
  };

  // loop through the array of routes and generate an unordered list
  return (routes.map(route => {
    // if this route has sub-routes, then show the ROOT as a list item and recursively render a nested list of route links
    if (route.routes) {
      return (dropDownRoute(route));
    }

    // no nested routes, so just render a single route
    return singleRoute(route);
  })
  );
};

export default Menu;
