import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Select, Button, Modal, Checkbox, Spin } from 'antd';
import { SlidersOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { mainInfo } from '../../../redux/actions';
import './quote.scss';
import { currencyFormat, divideValue } from "../../../helpers";
import CarQuoteDescription from "../CarQuoteDescription";
import QuoteCoverage from "../QuoteCoverage";
import { getQuote } from '../../../apis/segurosBolivar';

const Quote = ({ secure_car }) => {
  const [compareList, setCompareList] = useState([]);
  const [countCompareList, setCountCompareList] = useState(0);
  const [quoteData, setQuoteData] = useState();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isMoreInfoModalVisible, setIsMoreInfoModalVisible] = useState(false);
  const [isVisibleAddToCartModal, setIsVisibleAddToCartModal] = useState(false);
  

  const history = useHistory();
  const location = useLocation();
  
  const {
    vehicle,
    model,
    brand,
    zeroKm,
    userData,
  } = location.state.state;

  const { Option } = Select;

  const showMoreInfoModal = (numerodeliquidacion) => {
    setIsMoreInfoModalVisible({
      ...isMoreInfoModalVisible,
      [numerodeliquidacion]: true,
    });
  };

  const handleMoreInfoOk = (numerodeliquidacion) => {
    setIsMoreInfoModalVisible({
      ...isMoreInfoModalVisible,
      [numerodeliquidacion]: false,
    });
  };

  const handleMoreInfoCancel = (numerodeliquidacion) => {
    setIsMoreInfoModalVisible({
      ...isMoreInfoModalVisible,
      [numerodeliquidacion]: false,
    });
  };

  const showFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const handleFilterOk = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  const handleFilterCancel = () => {
    setIsFilterModalVisible(false);
  };

  const buySecureOk = () => {
    //setIsVisibleBuySecureModal(true);
  };

  const addToCart = async (secure) => {
    setIsVisibleAddToCartModal(true);
    const { numerodeliquidacion } = secure.responseData;
    const resData = await getQuote(userData, numerodeliquidacion);
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
          <Col xs={6}><p>{`Tipo de dentificación: ${userData.identificationType}`}</p></Col>
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

  const addtoFinalCompare = () => {
    history.push("/compare-quote", {
      state: {
        compareList,
        vehicle,
        brand,
        model,
        zeroKm, 
        userData,
      }
    });
  };

  const handleFilterByChange = (value) => {

  };

  const onChangeFirstCheckbox = (value) => {

  };

  const onChangeSecondCheckbox = (value) => {

  };

  const addtoCompare = (value) => {
    setCountCompareList(countCompareList + 1);
    const newCompareList = [];
    if(compareList.length > 0) newCompareList.push(...compareList);
    newCompareList.push(value);
    setCompareList(newCompareList);
    if(countCompareList === 1) {
      
    }
  };

  const deletefromCompare = (index) => {
    if(countCompareList > 0) {
      setCountCompareList(countCompareList - 1);
      const newCompareList = compareList;
      newCompareList.splice(index, 1);
      setCompareList(newCompareList);
    }
    else setCountCompareList(0);
  };

  const moreInfoModal = (responseData) => (
    <Modal
      title={`${responseData.opcionAutosDescripcion} - ${currencyFormat(responseData.totalPrima)}`}
      visible={isMoreInfoModalVisible[responseData.numerodeliquidacion]}
      onOk={() => handleMoreInfoOk(responseData.numerodeliquidacion)}
      okText="Aceptar"
      cancelText="Cancelar"
      onCancel={() => handleMoreInfoCancel(responseData.numerodeliquidacion)}
      z-index={responseData.numerodeliquidacion}
      >
      <div className="more-info-modal-container">
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
      </div>
    </Modal>
  );

  return (
    <div className="main-quote-container">
      <div style={{ padding: 50 }}>
        <h1>Cotizaciones</h1>
        <CarQuoteDescription
          vehicle={vehicle}
          brand={brand}
          model={model}
          zeroKm={zeroKm}
        />
        <Row>
          <Col className="select-col" xs={14}>
            <Select placeholder="Ordenar por" style={{ width: 185 }} onChange={handleFilterByChange}>
              <Option value="more-price">Mayor precio</Option>
              <Option value="less-price">Menor precio</Option>
              <Option value="companies">Compañia</Option>
            </Select>
          </Col>
          <Col className="filter-col" xs={10}>
            <div className="filter-container" onClick={showFilterModal}>
              <SlidersOutlined />
              <p>Filtrar</p>
            </div>
            {isFilterModalVisible && (
                <Modal title="Filtrar por" visible={isFilterModalVisible} onOk={handleFilterOk} okText="Filtrar" cancelText="Cancelar" onCancel={handleFilterCancel}>
                  <Row>
                    <Col xs={24} md={8}>
                      <p>Selecciona la frecuencia con la que usas tu automóvil</p>
                      <Checkbox.Group style={{ width: '100%' }} onChange={onChangeFirstCheckbox}>
                        <Row>
                          <Col xs={24} span={8}>
                            <Checkbox value="weekend">Solo fines de semana</Checkbox>
                          </Col>
                          <Col xs={24} span={8}>
                            <Checkbox value="week">A diario de lunes a viernes</Checkbox>
                          </Col>
                          <Col xs={24} span={8}>
                            <Checkbox value="everyday">Todos los dias</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Col>
                    <Col xs={24} md={8}>
                      <p className="second-description">¿Cuántas veces usas el conductor elegido al año?</p>
                      <Checkbox.Group style={{ width: '100%' }} onChange={onChangeSecondCheckbox}>
                        <Row>
                          <Col xs={24} span={8}>
                            <Checkbox value="oneToSix">1 a 6 veces</Checkbox>
                          </Col>
                          <Col xs={24} span={8}>
                            <Checkbox value="oneToTwelve">1 a 12 veces</Checkbox>
                          </Col>
                          <Col xs={24} span={8}>
                            <Checkbox value="moreTwelve">Más de 12</Checkbox>
                          </Col>
                          <Col xs={24} span={8}>
                            <Checkbox value="almostNever">Casi nunca</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Col>
                  </Row>
                </Modal>
              )}
          </Col>
        </Row>
        <Row>
          {secure_car ? (
            Object.values(secure_car).map((secure) => {
              const { responseData } = secure;
              return (
                <Col key={responseData.totalPrima} xs={24}>
                  <div className="company-items-container">
                    <Row className="company-descrip">
                      <Col className="" xs={16}>
                        <p className="title-type-plan">{responseData.opcionAutosDescripcion}</p>
                        <p className="methods-price">12 cuotas <span className="price">{divideValue(responseData.totalPrima, 12)}</span></p>
                        <p className="methods-price">Pago contado <span className="pay-price">{currencyFormat(responseData.totalPrima)}</span></p>
                      </Col>
                      <Col xs={8}>
                        <img className="img-company" src={`/images/secures_logos/seguros-bolivar.jpg`} alt="logo auto"/>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={24}>
                        <div className="company-item-descrip">
                          <QuoteCoverage coberturasCotizacion={responseData.coberturasCotizacion} />
                          <div className="more-info-container">
                            <p className="more-info" onClick={() => showMoreInfoModal(responseData.numerodeliquidacion)}>
                              Más Información
                            </p>
                            {isMoreInfoModalVisible[responseData.numerodeliquidacion] && moreInfoModal(responseData)}
                          </div>
                          <Row>
                            <Col xs={12}>
                              <Button type="primary" onClick={() => addtoCompare(secure)} className="btn-compare">
                                Comparar
                              </Button>
                            </Col>
                            <Col className="add-to-cart-col" xs={12}>
                              <Button type="primary" onClick={() => addToCart(secure)} className="btn-add-to-cart">
                                Solicitar
                              </Button>
                              {isVisibleAddToCartModal && addToCartModal(secure)}
                            </Col>
                          </Row>
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
      <Row className={`compare-container ${countCompareList > 0 ? 'show' : 'hide'}`}>
        <Col xs={24}>
          <Row>
            {compareList.map((secure, index) => (
              <Col key={index} xs={8}>
                <div className="compare-item-container">
                  <div className="close-container" onClick={() => deletefromCompare(index)}>
                    <CloseOutlined />
                  </div>
                  <div className="img-compare-container">
                    <img className="img-compare" src={`/images/secures_logos/seguros-bolivar.jpg`} alt="logo auto" />
                  </div>
                  <p>{currencyFormat(secure.responseData.totalPrima)}</p>
                </div>
              </Col>
            ))}
            <Col className="btn-final-col" xs={24}>
              <Button type="primary" onClick={addtoFinalCompare} className="btn-final-compare">
                Comparar
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  secure_car: state.secure_car,
});

const mapDispatchToProps = {
  mainInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Quote);
