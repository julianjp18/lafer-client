import React from "react";
import { Link, useHistory } from "react-router-dom";
import SiendoSeguroNav from '../../assets/images/siendo-seguro-nav.svg';
import './menu.scss';

function Menu({ goHome }) {
  const history = useHistory();

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

export default Menu;
