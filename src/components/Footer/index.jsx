// Overlay use className props to pass style properties to child component.
// To make this component work add className props to your child component manually.
// Here an example: https://gist.github.com/Miniplop/8f87608f8100e758fa5a4eb46f9d151f

import React, { useState } from 'react';
import { Modal } from 'antd';
import Terms from "../Landing/terms";
import Payments from "../../helpers/Payments";
import Facebook from '../../assets/images/facebook.svg';
import Divider from '../../assets/images/divider.svg';
import "./footer.scss";


const Footer = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className='footer'>
      <div className='footerContent'>
        <div className='contacto'>
          <div className='id'>
            <p
              className='laferSolucionesMasivasDeSeguros'
            >
              Lafer Soluciones Masivas de Seguros
            </p>
            <p className='nit9001768726'>
              NIT 900.176.872-6
            </p>
          </div>
          <div className='id'>
            <p className='caliColombia'>
              Cali, Colombia
            </p>
            <p className='caliColombia'>
              Calle 23 Norte # 5N 21
            </p>
            <p className='caliColombia'>
              Teléfono: &#43;57 2 4858528
              <br />
            </p>
          </div>
          <p className='emailSoportesiendoseguroCom'>
            Email: soporte&#64;siendoseguro.com
          </p>
        </div>
        <img
          alt=""
          className='divider'
          src={Divider}
        />
        <p
          className='conoceNuestraPoliticaDeTratamientoD'
        >
          <strong
            className='conoceNuestraPoliticaDeTratamientoDEmphasis0'
          >
            Conoce nuestra política de{" "}
          </strong>
          <a onClick={() => setVisible(true)}>Tratamientos de datos - Términos y condiciones</a>
          <Modal
            title="Términos y condiciones"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={820}
            okText="Volver"
            className="terms-modal"
          >
            {Terms}
          </Modal>
        </p>
        <img
          alt=""
          className='divider'
          src={Divider}
        />
        <Payments className='payments' />
        <img
          alt=""
          className='divider'
          src={Divider}
        />
        <div className='footerContent'>
          <p className='siguenosEn'>Síguenos en:</p>
          <img
            className="social-img"
            alt=""
            src={Facebook}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;