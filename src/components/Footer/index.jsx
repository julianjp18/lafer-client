// Overlay use className props to pass style properties to child component.
// To make this component work add className props to your child component manually.
// Here an example: https://gist.github.com/Miniplop/8f87608f8100e758fa5a4eb46f9d151f

import React, { useState } from 'react';
import { Modal } from 'antd';
import Terms from "../Landing/terms";
import Payments from "../../helpers/Payments";
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
          src="https://static.overlay-tech.com/assets/094696be-47fb-4332-8d2e-6c9826a16a17.svg"
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
          src="https://static.overlay-tech.com/assets/3a126680-18ef-4e9e-b10c-6643f18c172f.svg"
        />
        <Payments className='payments' />
        <img
          alt=""
          className='divider'
          src="https://static.overlay-tech.com/assets/df6c9fed-cc6f-488b-8da9-1e355fe1852c.svg"
        />
        <div className='footerContent'>
          <p className='siguenosEn'>Síguenos en:</p>
          <img
            className="social-img"
            alt=""
            src="https://static.overlay-tech.com/assets/e35f036d-3a36-4cc2-84bf-1cf353198e8d.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;