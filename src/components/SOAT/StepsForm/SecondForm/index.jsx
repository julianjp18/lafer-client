import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { Button, Modal, Row, Col, Spin } from 'antd';
import { saveSecureSelected, goFirstForm } from '../../../../redux/actions';

import "../stepsForm.scss";
import InsuCard from "../../../../helpers/InsuCard";
import Payments from "../../../../helpers/Payments";
import NormalButton from "../../../../helpers/Button";
import CoverageCard from "../../../../helpers/CoverageCard";
import { currencyFormat } from "../../../../helpers";

function SecondForm({
  vehicle_info_soat,
  client_info_soat,
  saveSecureSelected,
  goFirstForm,
}) {
  const history = useHistory();
  const [visible, setvisible] = useState(false);

  let audio = new Audio("/snap_of_finger.mp3");

  useEffect(() => {
    if (!vehicle_info_soat && !client_info_soat) {
      history.push('/');
    }
  }, []);

  const showModal = () => {
    setvisible(true);
  };

  const hideModal = () => {
    setvisible(false);
  };

  const SOATSelected = (cotizacion) => {
    try {
      audio.play();
    } catch (error) {
      console.log("no se pudo reproducir audio");
    }

    saveSecureSelected(cotizacion);

    history.push('/soat-payment-information');
  };

  const goBack = () => {
    goFirstForm();
    history.push('/soat-vehicle-information');
  };

  return vehicle_info_soat && client_info_soat ? (
    <div className="second-form-content">
      <Row>
        {client_info_soat.cotizaciones.length === 1 && (
          <Col xs={24} md={8}></Col>
        )}
        {client_info_soat.cotizaciones.map((cotizacion) => (
          <Col key={`${cotizacion.aseguradora}-${cotizacion.discount_total}`} xs={24} md={8}>
            <div className="second-form-container">
              <InsuCard
                secureName={cotizacion.aseguradora}
                productName={cotizacion.producto}
                price={currencyFormat(cotizacion.imp_total, 'COP')}
                isElectric={client_info_soat.esElectrico}
                isBonus
                isFromSecondForm
                discount={cotizacion.discount_text}
                priceBonus={currencyFormat(Number.parseInt(cotizacion.discount_total), 'COP')}
              />

              <Payments isSecondView />
              <div className="see-coverage-container">
                <Button type="link" onClick={showModal}>Ver coberturas</Button>
                <Modal
                  visible={visible}
                  footer={null}
                  onCancel={hideModal}
                  closable={false}
                  className="coverage-modal"
                >
                  <CoverageCard backButton={hideModal} />
                </Modal>
              </div>
              <div className="normal-button-container">
                <NormalButton text='Pagar' isOrange onClick={() => SOATSelected(cotizacion)} />
              </div>
            </div>
          </Col>
        ))}
        {client_info_soat.cotizaciones.length === 1 && (
          <Col xs={24} md={8}></Col>
        )}
        <Col className="back-col" xs={24}>
          <NormalButton text='Volver' isOrange onClick={goBack} />
        </Col>
      </Row>
    </div>
  ) : (
    <div className="spin-container not--dates">
      <Spin tip="Cargando..." size="large" />
    </div>
  );
}

const mapStateToProps = (globalState) => {
  const state = globalState.app;
  return ({
    vehicle_info_soat: state.vehicle_info_soat,
    client_info_soat: state.client_info_soat,
  });
};

const mapDispatchToProps = {
  saveSecureSelected,
  goFirstForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondForm);
