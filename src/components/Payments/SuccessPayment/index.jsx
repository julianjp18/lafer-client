import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from "react-router-dom";
import SiendoSeguroLarge from '../../../assets/images/siendo-seguro-large.png';
import { saveEmitLicensePlate } from '../../../redux/actions';
import './successPayment.scss';

const SuccessPayment = ({ saveEmitLicensePlate }) => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();

  useEffect(() => {
    if (query.get("TraceaId")) saveEmitLicensePlate(query.get("TraceaId"));
  }, [query]);

  return (
    <div className="success-payment-container">
      <div className='confirmacion'>
        <Row>
          <Col xs={24} md={6}>
            <img
              alt=""
              className='siendoSeguroVersionVertical1'
              src={SiendoSeguroLarge}
            />
          </Col>
          <Col className="text-col" xs={24} md={18}>
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
          </Col>
        </Row>
      </div>
    </div>
  )
};

const mapStateToProps = () => { };

const mapDispatchToProps = {
  saveEmitLicensePlate,
};

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPayment);
