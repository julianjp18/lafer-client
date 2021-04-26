import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { Button, Modal, Spin } from 'antd';
import { saveSecureSelected, saveEmitLicensePlate } from '../../../../redux/actions';

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
  saveEmitLicensePlate,
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
    saveEmitLicensePlate(client_info_soat.TraceaId);
    history.push('/soat-payment-information');
  };

  return vehicle_info_soat && client_info_soat ? (
    <div className="second-form-content">
      {client_info_soat.cotizaciones.map((cotizacion) => (
        <div key={`${cotizacion.aseguradora}-${cotizacion.discount_total}`} className="second-form-container">
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
            <NormalButton text='Pagar' onClick={() => SOATSelected(cotizacion)} />
          </div>
        </div>
      ))}
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
  saveEmitLicensePlate,
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondForm);
