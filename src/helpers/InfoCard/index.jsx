import React, { useState } from "react";
import { Col, Row, Modal } from "antd";
import NormalButton from "../Button";
import "./infoCard.scss";

const InfoCard = ({
  plate,
  brandCar,
  modelCar,
  ccCar,
  name = '',
  homologaciones = '',
  isFromThirdView,
}) => {
  const [visible, setvisible] = useState(false);
  const hideModal = () => {
    setvisible(false);
  };

  const showModal = () => {
    setvisible(true);
  };

  return (
    <div className='infocard'>
      <div className='container'>
        <div className='header'>
          <p className='informacionDelAutomovil'>
            Información del automóvil
          </p>
          <div className='ggmenuRound'>
            {isFromThirdView && homologaciones !== '' && (
              <img
                className="homologaciones-image"
                alt=""
                src="https://static.overlay-tech.com/assets/20032b5e-688e-44eb-9f72-77d6e99ead3c.svg"
                onClick={showModal}
              />
            )}
          </div>
        </div>
        <div className='infologo'>
          <img
            alt=""
            className='siendoSeguroVersionVertical1'
            src="https://static.overlay-tech.com/assets/515dfa0a-fd20-4611-9e34-9c8c080f5d61.png"
          />
          <div className='info'>
            <div className='row1'>
              <div className='field1'>
                <p className='placa'>Placa</p>
                <p className='kuj213'>{plate}</p>
              </div>
              <div className='field1'>
                <p className='marca'>Marca</p>
                <p className='bmwM3'>{brandCar}</p>
              </div>
            </div>
            <div className='row1'>
              <div className='field3'>
                <p className='modelo'>Modelo</p>
                <p className='num2019'>{modelCar}</p>
              </div>
              <div className='field3'>
                <p className='cilindraje'>
                  Cilindraje
                </p>
                <p className='num2000'>{ccCar}</p>
              </div>
            </div>
            <div className='info'>
              <p className='nombrePropietario'>
                Nombre propietario
              </p>
              <p className='caoAnsHesBaa'>
                {name}
              </p>
            </div>
          </div>
        </div>
        <p
          className='estaInformacionSeExtraeDirectamente'
        >
          Esta información se extrae directamente del RUNT,
          si hay algún error debes ponerte en contacto con
          ellos.
        </p>
        <Modal
          visible={visible}
          footer={null}
          onOk={() => showModal()}
          onCancel={hideModal}
          closable={false}
          className="soat-class-modal"
        >
          <div className="important-info-container">
            <h2 className="important-info-title">Clase sobre la cual quieres expedir tu SOAT</h2>
            <p className="important-info-description">
              Verifica que sea la clase correcta:
            </p>
            <div className="classes-car-container">
              {homologaciones.length > 0 && homologaciones.map((homologacion) => (
                <p className="important-info-extra-description" key={homologacion.clase.codClase}>
                  <i>{`- ${homologacion.clase.txtDesc}`}</i>
                </p>
              ))}
            </div>
            <Row>
              <Col xs={24}>
                <NormalButton text='Aceptar' onClick={hideModal} />
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default InfoCard;