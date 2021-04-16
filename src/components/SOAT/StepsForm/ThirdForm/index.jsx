import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Spin, Modal, Row, Col } from "antd";
import { WarningOutlined } from '@ant-design/icons';
import NormalButton from "../../../../helpers/Button";
import InsuCard from "../../../../helpers/InsuCard";
import InfoCard from "../../../../helpers/InfoCard";
import { currencyFormat } from "../../../../helpers";

function ThirdForm({
  vehicle_info_soat,
  client_info_soat,
  secure_selected,
}) {
  const history = useHistory();
  const [visible, setvisible] = useState(false);

  let audio = new Audio("/snap_of_finger.mp3");

  useEffect(() => {
    if (!vehicle_info_soat && !client_info_soat && !secure_selected) {
      history.push('/');
    }
  }, []);

  const hideModal = () => {
    setvisible(false);
  };

  const showInfoModal = () => {
    setvisible(true);
  };

  const showModal = () => {
    try {
      audio.play();
    } catch (error) {
      console.log("no se pudo reproducir audio");
    }

    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'post';
    form.action = "https://demover3-1.tucompra.net/tc/app/inputs/compra.jsp";
    var inputBillNumber = document.createElement('input');
    var inputBillValue = document.createElement('input');
    var inputBillDescription = document.createElement('input');
    var inputBillIdUser = document.createElement('input');

    inputBillNumber.type = 'hidden';
    inputBillNumber.name = "factura";
    inputBillNumber.id = "factura";
    inputBillNumber.value = `${secure_selected.cotizacion_nro}`;

    inputBillValue.type = 'hidden';
    inputBillValue.name = "valor";
    inputBillValue.id = "valor";
    inputBillValue.value = parseInt(secure_selected.discount_total.replace("$ ", "").replace(".", ""));

    inputBillDescription.type = 'hidden';
    inputBillDescription.name = "descripcionFactura";
    inputBillDescription.id = "descripcionFactura";
    inputBillDescription.value = `Compra seguro para auto ${vehicle_info_soat.data.marca} ${vehicle_info_soat.data.modelo} (${vehicle_info_soat.data.plate})`;

    inputBillIdUser.type = 'hidden';
    inputBillIdUser.name = "usuario";
    inputBillIdUser.id = "usuario";
    inputBillIdUser.value = 'i96td5084822950k';

    form.appendChild(inputBillNumber);
    form.appendChild(inputBillValue);
    form.appendChild(inputBillDescription);
    form.appendChild(inputBillIdUser);
    form.submit();
  };


  return vehicle_info_soat && client_info_soat && secure_selected ? (
    <div className="third-form-container">
      <InfoCard
        plate={vehicle_info_soat.data.plate}
        brandCar={vehicle_info_soat.data.marca}
        modelCar={vehicle_info_soat.data.modelo}
        ccCar={vehicle_info_soat.data.cilindraje}
        name={vehicle_info_soat.data.propietarios}
        homologaciones={client_info_soat.homologaciones ? client_info_soat.homologaciones : ''}
        isFromThirdView
      />
      <InsuCard
        secureName={secure_selected.aseguradora}
        productName={secure_selected.producto}
        price={currencyFormat(secure_selected.imp_total, 'COP')}
        isElectric={client_info_soat.esElectrico}
        isBonus
        isFromSecondForm
        discount={secure_selected.discount_text}
        priceBonus={currencyFormat(Number.parseInt(secure_selected.discount_total), 'COP')}
      />
      <Modal
        visible={visible}
        footer={null}
        onOk={() => showModal()}
        onCancel={hideModal}
        closable={false}
      >
        <div className="important-info-container">
          <h2 className="important-info-title"><WarningOutlined /> Aviso</h2>
          <p className="important-info-description">
            Al dar clic aceptas irrevocablemente todos los términos y condiciones, ¿deseas continuar?
          </p>
          <Row>
            <Col xs={12}>
              <NormalButton text='Si' onClick={showModal} />
            </Col>
            <Col xs={12}>
              <NormalButton text='No' isOrange onClick={hideModal} />
            </Col>
          </Row>
        </div>
      </Modal>
      <div className="button-container">
        <NormalButton text='Pagar' onClick={() => showInfoModal()} />
      </div>
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
    secure_selected: state.secure_selected,
  });
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ThirdForm);
