import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import {
  Col,
  Form,
  Row,
  Spin,
  Modal,
} from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import InfoCard from "../../../../helpers/InfoCard";
import InsuCard from "../../../../helpers/InsuCard";
import MainButton from "../../../../helpers/MainButton";
import BonusForm from "./BonusForm";
import { currencyFormat } from "../../../../helpers";
import { clientInfo } from '../../../../redux/actions';

import "../stepsForm.scss";
import NormalButton from "../../../../helpers/Button";

function FirstForm({ vehicle_info_soat, client_info_soat, clientInfo, response }) {
  const history = useHistory();
  const [visible, setvisible] = useState(false);
  const [vehicleInfo, setvehicleInfo] = useState(vehicle_info_soat ? vehicle_info_soat.data : {});
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  let audio = new Audio("/snap_of_finger.mp3");

  useEffect(() => {
    if (!vehicle_info_soat) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    if (response) {
      if (response.statusError === 401) {
        setvisible(true);
      } else {
        setShowErrorMessage(false);
      }
    }

  }, [response]);

  useEffect(() => {
    if (client_info_soat) {
      if (client_info_soat.TraceaId) {
        setvisible(false);
        history.push("/soat-secure-information");
      }
    } else {
      setShowErrorMessage(false);
    }

  }, [client_info_soat]);

  const showModal = () => {
    setvisible(true);
  };

  const hideModal = () => {
    setvisible(false);
  };

  const onFinish = (values) => {
    try {
      audio.play();
    } catch (error) {
      console.log("no se pudo reproducir audio");
    }

    clientInfo({
      ...values,
      plate: vehicleInfo.plate,
      discount_id: 2,
    });

    setShowErrorMessage(false);
  };

  const onFinishFailed = (values) => {
    console.log(values);
  };

  return vehicle_info_soat ? (
    <div className="first-form-container" >
      <Row className="first-form-content">
        <Col xs={24} md={12}>
          <InfoCard
            plate={vehicleInfo.plate}
            brandCar={vehicleInfo.marca}
            modelCar={vehicleInfo.modelo}
            ccCar={vehicleInfo.cilindraje}
            name={vehicleInfo.propietarios}
          />
          <div className="extra-info-container">
            <p className="extra-info-text">Este es el precio de tu SOAT sin el bono de descuento</p>
          </div>
          <InsuCard
            secureName={'SOAT Seguros Mundial'}
            price={currencyFormat(vehicleInfo.totalValue, 'COP')}
          />
        </Col>
        <Col xs={24} md={12}>
          <div className="extra-info-container">
            <p className="extra-info-text">Para calcular tu bono de descuento, requerimos los siguientes datos:</p>
          </div>
          <Form
            name="get-user-discount-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <BonusForm />
            <Form.Item>
              <MainButton text='Obtener mi bono' isOrange fromBonus />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Modal
        visible={visible}
        footer={null}
        onOk={() => showModal()}
        onCancel={hideModal}
        closable={false}
      >
        <div className="important-info-container">
          <h2 className="important-info-title"><WarningOutlined /> Advertencia</h2>
          <p className="important-info-description first-modal">
            {response.message}
          </p>
          <Row>
            <Col xs={24}>
              <NormalButton text='Aceptar' onClick={hideModal} />
            </Col>
          </Row>
        </div>
      </Modal>
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
    response: state.response,
  });
};

const mapDispatchToProps = {
  clientInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstForm);

