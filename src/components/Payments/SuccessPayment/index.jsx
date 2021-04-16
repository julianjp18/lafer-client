import React from 'react';
import SiendoSeguroLarge from '../../../assets/images/siendo-seguro-large.png';
import './successPayment.scss';

const SuccessPayment = () => {

  return (
    <div className="success-payment-container">
      <div className='confirmacion'>
        <img
          alt=""
          className='siendoSeguroVersionVertical1'
          src={SiendoSeguroLarge}
        />
        <p className='elPagoDeTuSoatHaSidoExitoso'>
          ¡El pago de tu SOAT ha sido exitoso!
        </p>
        <p
          className='laAseguradoraEnviaraATuCorreoElect'
        >
          La aseguradora enviará a tu correo electrónico la
          póliza de tu SOAT.
        </p>
        <p
          className='laAseguradoraEnviaraATuCorreoElect'
        >
          El comprobante de pago llegará a tu <br />
        correo electrónico.
        </p>
        <p className='recuerdaRevisarTuCarpetaDeSpamON'>
          (Recuerda revisar tu carpeta de spam o no deseados)
        </p>
      </div>
    </div>
  )
};

export default SuccessPayment;
