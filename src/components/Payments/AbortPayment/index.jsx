import React from 'react';
import './abortPayment.scss';

const AbortPayment = () => {

  return (
    <div className='confirmacion'>
      <img
        alt=""
        className='siendoSeguroVersionVertical1'
        src="https://static.overlay-tech.com/assets/2dcfd02e-7772-460e-9049-8aad968b3bfb.png"
      />
      <p className='elPagoDeTuSoatHaSidoExitoso'>
        ¡El pago de tu SOAT ha sido abortado!
      </p>
      <p
        className='laAseguradoraEnviaraATuCorreoElect'
      >
        No se ha realizado tu pago, por favor inténtalo nuevamente.
      </p>
      <p
        className='laAseguradoraEnviaraATuCorreoElect'
      >
        Muchas gracias por confiar en nosotros.
      </p>
    </div>
  )
};

export default AbortPayment;
