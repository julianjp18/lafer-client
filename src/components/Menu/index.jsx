import React, { useState } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../routing/routes";
import './menu.scss';

function Menu({ }) {
  const [isToggle, setisToggle] = useState(false);

  const burgerOnClick = () => {
    setisToggle(!isToggle);
  };

  return (
    <nav className="navbar">
      <div className="navbrand">
        <h1 className="Brand"><Link to='/'><img className="img-logo" src={'/images/logo-large.png'} /></Link></h1>
        <div className={`burger ${isToggle ? 'active' : ''}`} onClick={burgerOnClick} id="burger">
          <div className="social-responsive">
            {/*<a href="#" className="social-item-responsive">
              <img src={'/images/icons/wa-small.png'} alt="whatsapp icon"/>
            </a>*/}
          </div>
          <span className="burger-open">
            <img className="menu-open" src={'/images/menu-open.svg'} alt="menu open"/>
          </span>
          <span className="burger-close">
            <img className="menu-open" src={'/images/menu-close.svg'} alt="menu close"/>
          </span>
        </div>
      </div>
      <ul className={`menu ${isToggle ? 'active' : ''}`} id="menu">
        {!localStorage.getItem("user") ? displayRouteMenu(ROUTES) : displayAuthRouteMenu(ROUTES)}
      </ul>
    </nav>
  );
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
