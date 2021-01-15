import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import ROUTES from "../../routing/routes";
import './menu.scss';

function Menu({ }) {
  const [isToggle, setisToggle] = useState(false);
  const history = useHistory();

  const burgerMenu = document.getElementById("burger");
  const navbarMenu = document.getElementById("menu");

  const burgerOnClick = () => {
    setisToggle(!isToggle);
  };

  return (
    <nav className="navbar">
      <div className="navbrand">
        <h1 className="Brand"><Link to='/'>Huron</Link></h1>
        <div className={`burger ${isToggle ? 'active' : ''}`} onClick={burgerOnClick} id="burger">
          <div className="social-responsive">
            <a href="#" className="social-item-responsive"><i className="fab fa-whatsapp"></i></a>
          </div>
          <span className="burger-open">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16">
              <g fill="#252a32" fillRule="evenodd">
                <path d="M0 0h24v2H0zM0 7h24v2H0zM0 14h24v2H0z" />
              </g>
            </svg>
          </span>
          <span className="burger-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
              <path fill="#252a32" fillRule="evenodd" d="M17.778.808l1.414 1.414L11.414 10l7.778 7.778-1.414 1.414L10 11.414l-7.778 7.778-1.414-1.414L8.586 10 .808 2.222 2.222.808 10 8.586 17.778.808z" />
            </svg>
          </span>
        </div>
      </div>
      <ul className={`menu ${isToggle ? 'active' : ''}`} id="menu">
        {!localStorage.getItem("user") ? displayRouteMenu(ROUTES) : displayAuthRouteMenu(ROUTES)}
      </ul>
      <div className="social">
        <a href="#" className="social-item"><i className="fab fa-facebook"></i></a>
        <a href="#" className="social-item"><i className="fab fa-twitter"></i></a>
        <a href="#" className="social-item"><i className="fab fa-instagram"></i></a>
        <a href="#" className="social-item"><i className="fab fa-whatsapp"></i></a>
      </div>
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

export default Menu;
