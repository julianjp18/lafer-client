import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from "react-router-dom";
import SiendoSeguroLarge from '../../../assets/images/siendo-seguro-large.png';
import { saveEmitLicensePlate } from '../../../redux/actions';
import './abortPayment.scss';

const AbortPayment = ({ saveEmitLicensePlate }) => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();

  useEffect(() => {
    //if (query.get("TraceaId")) saveEmitLicensePlate(query.get("TraceaId"));
  }, []);

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
              ¡El pago de tu SOAT ha sido rechazado!
            </p>
            <p className="laAseguradoraEnviaraATuCorreoElect">Tu seguro no puede ser expedido en este momento. Por favor comunícate con un asesor en el siguiente número:</p>
            <p className="laAseguradoraEnviaraATuCorreoElect">327 4712 - 327 4713</p>
            <p className="laAseguradoraEnviaraATuCorreoElect">En los siguientes horarios</p>
            <p className="laAseguradoraEnviaraATuCorreoElect">Lunes a jueves: <br />
              8:00 a.m. a 5:00 p.m.
            </p>
            <p className="laAseguradoraEnviaraATuCorreoElect">Viernes: 8:00 a.m. a 4:15 p.m.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(AbortPayment);
