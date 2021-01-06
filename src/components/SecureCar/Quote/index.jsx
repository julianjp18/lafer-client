import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Select, Button } from 'antd';
import { SlidersOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { mainInfo } from '../../../redux/actions';
import './quote.scss';
import { currencyFormat } from "../../../helpers";

function Quote({ secure_car }) {
  const [compareList, setCompareList] = useState([]);
  const [countCompareList, setCountCompareList] = useState(0);
  const history = useHistory();
  const location = useLocation();
  
  const {
    vehicle,
    model,
    brand,
    city,
    zeroKm,
  } = location.state.state;

  const { Option } = Select;

  const addtoFinalCompare = () => {
    history.push("/steps-form");
  };

  const handleFilterByChange = (value) => {

  };

  const addtoCompare = (value) => {
    setCountCompareList(countCompareList + 1);
    const newCompareList = [];
    newCompareList.push(compareList);
    newCompareList.push(value);
    setCompareList(newCompareList);
  };

  const deletefromCompare = (value) => {
    if(countCompareList > 0) setCountCompareList(countCompareList - 1);
    else setCountCompareList(0);
  };

  const divideValue = (value) => 
    currencyFormat(Number.parseInt(value / 12));

  return (
    <div className="main-quote-container">
      <div style={{ padding: 50 }}>
        <h1>Cotizaciones</h1>
        <Row className="descrip-container">
          <h2 className="descrip-title">Información automóvil</h2>
          <Col xs={10}>
            <img className="img-auto" src="https://via.placeholder.com/120" alt="logo auto" />
          </Col>
          <Col xs={14}>
            <Row className="descrip-auto-container">
              <Col xs={12}>
                <p className="title-info">Placa</p>
                <p className="result-info">{vehicle}</p>
              </Col>
              <Col xs={12}>
                <p className="title-info">Marca</p>
                <p className="result-info">{brand}</p>
              </Col>
              <Col xs={12}>
                <p className="title-info">Modelo</p>
                <p className="result-info">{model}</p>
              </Col>
              <Col xs={12}>
                <p className="title-info">¿Es cero Km?</p>
                <p className="result-info">{zeroKm ? 'Si' : 'No'}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="select-col" xs={12}>
            <Select placeholder="Ordenar por" style={{ width: 150 }} onChange={handleFilterByChange}>
              <Option value="more-price">Mayor precio</Option>
              <Option value="less-price">Menor precio</Option>
              <Option value="companies">Compañia</Option>
            </Select>
          </Col>
          <Col className="filter-col" xs={12}>
            <div className="filter-container">
              <SlidersOutlined />
              <p>Filtrar</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <div className="company-items-container">
              <Row className="company-descrip">
                <Col className="" xs={16}>
                  <p className="title-type-plan">Premium</p>
                  <p className="methods-price">12 cuotas <span className="price"> $ 166.000</span></p>
                  <p className="methods-price">Pago contado <span className="pay-price"> $ 1.000.000</span></p>
                </Col>
                <Col xs={8}>
                  <img className="img-company" src="https://via.placeholder.com/100" alt="logo auto"/>
                </Col>
              </Row>
              <Row>
                <Col xs={24}>
                  <div className="company-item-descrip">
                    <p>
                      <CheckOutlined />
                      Daños a terceros (RCE): $ 7.000 millones 
                    </p>
                    <p>
                      <CheckOutlined />
                      Pérdida total: $ sin deducible 
                    </p>
                    <p>
                      <CloseOutlined />
                      Pérdida parcial: no cubre
                    </p>
                    <p>
                      <CheckOutlined />
                      Grúa: Avería o accidente 
                    </p>
                    <p>
                      <CloseOutlined />
                      Conductor elegido: no cubre
                    </p>
                    <p>
                      <CloseOutlined />
                      Vehiculo reemplazo: no cubre
                    </p>
                    <div className="more-info-container">
                      <p className="more-info">
                        Más Información
                      </p>
                    </div>
                    <div>
                      <Button type="primary" onClick={() => addtoCompare(1)} className="btn-submit">
                        Comparar
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          {secure_car && (
            secure_car.map((secure) => (
              <Col xs={24}>
                <div className="company-items-container">
                  <Row className="company-descrip">
                    <Col className="" xs={16}>
                      <p className="title-type-plan">{secure.responseData.opcionAutosDescripcion}</p>
                      <p className="methods-price">12 cuotas <span className="price">{divideValue(secure.responseData.totalPrima)}</span></p>
                      <p className="methods-price">Pago contado <span className="pay-price">{currencyFormat(secure.responseData.totalPrima)}</span></p>
                    </Col>
                    <Col xs={8}>
                      <img className="img-company" src="https://via.placeholder.com/100" alt="logo auto"/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24}>
                      <div className="company-item-descrip">
                        {secure.responseData.coberturasCotizacion.map((coberturaCotizacion) => (
                          <p>
                            <CheckOutlined />
                            {`${coberturaCotizacion.descripcion}: ${currencyFormat(coberturaCotizacion.valorPrima)}`} 
                          </p>
                        )) }
                        <div className="more-info-container">
                          <p className="more-info">
                            Más Información
                          </p>
                        </div>
                        <div>
                          <Button type="primary" onClick={() => addtoCompare(secure)} className="btn-submit">
                            Comparar
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))
          )}
        </Row>
      </div>
      <Row className={`compare-container ${countCompareList > 0 ? 'show' : 'hide'}`}>
        <Col xs={24}>
          <Row>
            {compareList.map((secure, index) => (
              <Col xs={8}>
                <div className="compare-item-container">
                  <div className="close-container" onClick={() => deletefromCompare(index)}>
                    <CloseOutlined />
                  </div>
                  <img className="img-compare" src="https://via.placeholder.com/80" alt="logo auto" />
                  <p>{currencyFormat(secure.responseData.valorPrima)}</p>
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
