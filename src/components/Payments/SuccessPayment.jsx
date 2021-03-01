import React from 'react';
import { Link } from 'react-router-dom';
import './payments.scss';

const SuccessPayment = () => {

  return (
    <main className="success__page">
      <section className="success__container">
        <img className="img" src="images/icons/click.svg" alt="logo tanSeguro"/>
        <h2 className="success__container--title">¡El pago de tu SOAT ha sido exitoso!</h2>
        <p>
          Comenzará a asegurarte desde el 18/02/2021 a las 11:59 p.m.
        </p>
        <Link className="btn btn-success success__container--button" to={''}>Finalizar</Link>
        <span>También hemos enviado a tu WhatsApp el link de descarga del SOAT.</span>
      </section>
    </main>
  )
};

export default SuccessPayment;
