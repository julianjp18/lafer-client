import React, { useState } from 'react';
import { Modal } from 'antd';
import Terms from "../Landing/terms";
import './footer.scss';
import 'antd/dist/antd.css';

const Footer = () => {
  const [visible, setVisible] = useState(false);

  return (
    <footer className="footer">
      <section className="footer__container">
        <article className="footer__container--info">
          <h6>
            Lafer Soluciones Masivas de Seguros
          </h6>
          <p>
            NIT 900.176.872-6
          </p>
          <br/>
          <p>
            Cali, Colombia
          </p>
          <p>
            Calle 23 Norte # 5N 21
          </p>
          <p>
            Teléfono: <a href="tel:+5724858528">+57 2 4858528</a>
          </p>
          <br/>
          <p>
            Email: <a href="mailto:soporte@siendoseguro.com">soporte@siendoseguro.com</a>
          </p>
        </article>
        <div className="line--gray" />
        <article className="footer__container--policy">
          <p>
          <a onClick={() => setVisible(true)}><u>Conoce nuestra política de tratamientos de datos</u> - <u>Términos y condiciones</u></a>
          </p>
          <Modal
            title="Términos y condiciones"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={820}
            okText="Volver"
          >
            {Terms}
          </Modal>
        </article>
        <div className="line--gray" />
        <article className="footer__container--cards">
          <p>Métodos de pago</p>
          <div className="footer__container--cards">
            <img src="/images/cards_logos/mastercard_footer.png" alt="mastercard" className="cards--mastercard" />
            <img src="/images/cards_logos/visa_footer.png" alt="visa" className="cards--visa" />
            <img src="/images/cards_logos/pse.png" alt="pse" className="cards--pse" />
          </div>
        </article>
        <div className="line--gray" />
        <article className="footer__container--social" >
          <p>Síguenos en:</p>
          <a href="https://www.facebook.com/SiendoSegurocom-543227206609882" target="_blank" className="social-item">
            <img src="/images/icons/facebook.svg" alt="icono facebook" />
          </a>
        </article>
      </section>
    </footer>
  );
};

export default Footer;
