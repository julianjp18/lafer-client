import React, { useEffect, useState } from "react";
import { Col, Row, Modal, Checkbox } from "antd";
import NormalButton from "../Button";
import classesDropdown from '../../assets/images/classes-dropdown.svg';
import SiendoSeguroHand from '../../assets/images/siendo-seguro-hand.png';
import "./infoCard.scss";

const InfoCard = ({
  plate,
  brandCar,
  modelCar,
  ccCar,
  name = '',
  homologaciones = '',
  isFromThirdView,
  setclassesCheckedValues,
}) => {
  const [visible, setvisible] = useState(false);
  const [optionsCheckbox, setoptionsCheckbox] = useState([]);

  useEffect(() => {
    if (isFromThirdView && homologaciones !== '') {
      setoptionsCheckbox([]);
      const newOptionsCheckbox = [];
      homologaciones.forEach((homologacion) => {
        newOptionsCheckbox.push({
          label: homologacion.clase.txtDesc,
          value: homologacion.clase.codClase,
        });
      });
      setoptionsCheckbox(newOptionsCheckbox);
    }
  }, []);


  const onChange = (checkedValues) => {

    if (checkedValues.length > 0) {
      setclassesCheckedValues(checkedValues);
    } else {
      setclassesCheckedValues([]);
    }
  };

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
                src={classesDropdown}
                onClick={showModal}
              />
            )}
          </div>
        </div>
        <div className='infologo'>
          <img
            alt=""
            className='siendoSeguroVersionVertical1'
            src={SiendoSeguroHand}
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
              {homologaciones.length > 0 && (
                <Checkbox.Group
                  className="important-info-extra-description"
                  options={optionsCheckbox}
                  onChange={onChange}
                />
              )}
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