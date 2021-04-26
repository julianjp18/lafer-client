import React, { useState } from 'react';
import { Modal } from 'antd';
import Terms from "../Landing/terms";
import Payments from '../../helpers/Payments';
import "./footerDesktop.scss";

const FooterDesktop = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className='footerHorizontal'>
      <div className='contact'>
        <div className='id'>
          <p className='subtitle'>
            Lafer Soluciones Masivas de Seguros
          </p>
          <p className='textoNit'>
            NIT 900.176.872-6
          </p>
        </div>
        <div className='id'>
          <p className='city'>Cali, Colombia</p>
          <p className='addres'>
            Calle 23 Norte # 5N 21{" "}
          </p>
          <p className='textoTel'>
            Teléfono: &#43;57 2 4858528
            <br />
          </p>
        </div>
        <p className='textoEmail'>
          Email: soporte&#64;siendoseguro.com
        </p>
      </div>
      <div className='divider1' />
      <p className='text2'>
        <strong className='text2Emphasis0'>
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
      <div className='divider1' />
      <Payments className='payments' />
      <div className='divider1' />
      <div className='redes'>
        <p className='text4'>Síguenos en:</p>
        <img
          alt=""
          src="https://static.overlay-tech.com/assets/9d276c4f-8ad9-4f3e-94bd-04ee4543e0b0.png"
        />
      </div>
    </div>
  );
};

export default FooterDesktop;
