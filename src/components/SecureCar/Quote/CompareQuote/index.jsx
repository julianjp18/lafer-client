import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Button, Spin, Modal } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import './compareQuote.scss';
import { currencyFormat, divideValue } from "../../../../helpers";
import CarQuoteDescription from "../../CarQuoteDescription";
import QuoteCoverage from "../../QuoteCoverage";
import { getQuote } from '../../../../apis/segurosBolivar';

const CompareQuote = ({}) => {
  const [isVisibleBuySecureModal, setIsVisibleBuySecureModal] = useState(false);
  const [isVisibleAddToCartModal, setIsVisibleAddToCartModal] = useState(false);
  const [quoteData, setQuoteData] = useState();
  const history = useHistory();
  const location = useLocation();
  
  const {
    compareList,
    vehicle,
    brand,
    model,
    zeroKm,
    userData,
  } = location.state.state;

  const buySecureOk = () => {
    setIsVisibleBuySecureModal(true);
  };

  const addToCart = async (secure) => {
    setIsVisibleAddToCartModal(true);
    const { numerodeliquidacion } = secure.responseData;
    const resData = await getQuote(userData, numerodeliquidacion);
    console.log(resData, secure);
    setQuoteData(resData);
  };

  const addToCartModal = ({ responseData }) => (
    <Modal
      title={`${responseData.opcionAutosDescripcion} - ${currencyFormat(responseData.totalPrima)}`}
      visible={isVisibleAddToCartModal}
      onOk={buySecureOk}
      okText="Comprar"
      cancelText="Cancelar"
      onCancel={() => setIsVisibleAddToCartModal(false)}
      okButtonProps={{ disabled: quoteData ? true : false }}
      cancelButtonProps={{ disabled: quoteData ? true : false }}
      z-index={responseData.numerodeliquidacion}
    >
      {quoteData ? (
        <div className="more-info-modal-container">
        <Row>
          <Col xs={12}><p>{`Nombre completo: ${userData.name} ${userData.lastName}`}</p></Col>
          <Col xs={12}><p>{`Correo electrónico: ${userData.email}`}</p></Col>
          <Col xs={6}><p>{`Tipo de dentificación: ${userData.typeIdentification}`}</p></Col>
          <Col xs={6}><p>{`Identificación: ${userData.identification}`}</p></Col>
          <Col xs={12}><p>{`Género: ${userData.genre}`}</p></Col>
          <Col xs={12}><p>{`Ciudad: ${userData.city}`}</p></Col>
          <Col xs={12}><p>{`Dirección: ${userData.address}`}</p></Col>
        </Row>
        <Row>
          <Col xs={12}>
            <QuoteCoverage coberturasCotizacion={responseData.coberturasCotizacion} />
          </Col>
          <Col xs={12}>
            <p>
              <CheckOutlined />
              {`Deducible en hurto: ${responseData.deducibleEnHurto}`}
            </p>
            <p>
              <CheckOutlined />
              {`Deducible en RCE: ${responseData.deducibleEnRCE}`}
            </p>
            <p>
              <CheckOutlined />
              {`Deducible perdida total: ${responseData.deduciblePeridaTotal}`}
            </p>
            <p>
              <CheckOutlined />
              {`Deducible perdida parcial: ${currencyFormat(responseData.deduciblePeridaParcial)}`}
            </p>
            <p>
              <CheckOutlined />
              {`Requiere inspección: ${responseData.reqInspeccion === 'S' ? 'Si' : 'No'}`}
            </p>
          </Col>
        </Row>
      </div>
      ) : (
        <div className="spin-container">
          <Spin tip="Cargando..." size="large"/>
        </div>
      )}
    </Modal>
  );

  const buySecureModal = () => (
    <Modal
      title="FINALIZA PROCESO"
      visible={isVisibleBuySecureModal}
      onOk={() => setIsVisibleBuySecureModal(false)}
      okText="Ok"
      cancelText="Cancelar"
      onCancel={() => setIsVisibleBuySecureModal(false)}
    >
      <div className="more-info-modal-container">
        <p>HASTA AQUÍ FINALIZA EL PROCESO, CONTINUA PASARELA DE PAGOS</p>
      </div>
    </Modal>
  );
  return (
    <div className="main-quote-container">
      <div style={{ padding: 50 }}>
        <h1>Lista de tus comparaciones</h1>
        <CarQuoteDescription
          vehicle={vehicle}
          brand={brand}
          model={model}
          zeroKm={zeroKm}
        />
        <Row>
          {compareList ? (
            compareList.map((secure) => {
              const { responseData } = secure;
              return (
                <Col key={responseData.opcionAutosDescripcion} xs={24}>
                  <div className="company-items-container">
                    <Row className="company-descrip">
                      <Col className="" xs={16}>
                        <p className="title-type-plan">{responseData.opcionAutosDescripcion}</p>
                        <p className="methods-price">12 cuotas <span className="price">{divideValue(responseData.totalPrima)}</span></p>
                        <p className="methods-price">Pago contado <span className="pay-price">{currencyFormat(responseData.totalPrima)}</span></p>
                      </Col>
                      <Col xs={8}>
                        <img className="img-company" src="https://via.placeholder.com/100" alt="logo auto"/>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={24}>
                        <div className="company-item-descrip">
                          <QuoteCoverage coberturasCotizacion={responseData.coberturasCotizacion} />
                          <div>
                            <Button type="primary" onClick={() => addToCart(secure)} className="btn-submit">
                              Comprar
                            </Button>
                            {isVisibleAddToCartModal && addToCartModal(secure)}
                            {isVisibleBuySecureModal && buySecureModal()}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              );
            })
          ): (
            <div className="spin-container">
              <Spin tip="Cargando..." size="large"/>
            </div>
          )}
        </Row>
      </div>
    </div>
  );
}

export default CompareQuote;
