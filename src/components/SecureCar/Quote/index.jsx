import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Select, Button } from 'antd';
import { SlidersOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { mainInfo } from '../../../redux/actions';
import './quote.scss';

function Quote({ mainInfo, response }) {
  const [comparyList, setcomparyList] = useState();
  const history = useHistory();

  const { Option } = Select;

  const onFinish = (values) => {
    mainInfo(values);
    history.push("/steps-form");
  };

  const handleFilterByChange = (value) => {

  };

  const addtoCompare = (value) => {

  };

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
                <p className="result-info">KIU123</p>
              </Col>
              <Col xs={12}>
                <p className="title-info">Marca</p>
                <p className="result-info">Kia Picanto</p>
              </Col>
              <Col xs={12}>
                <p className="title-info">Modelo</p>
                <p className="result-info">2017</p>
              </Col>
              <Col xs={12}>
                <p className="title-info">Cilindraje</p>
                <p className="result-info">1.000</p>
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
                    <div>
                      <Button type="primary" onCLick={() => addtoCompare(1)} className="btn-submit">
                        Comparar
                      </Button>
                    </div>
                    <p className="more-info">
                      Más Información
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="compare-container">
        <Col xs={24}>
          <Row>
            <Col xs={8}>
              <div className="compare-item-container">
                <div className="close-container">
                  <CloseOutlined />
                </div>
                <img className="img-compare" src="https://via.placeholder.com/80" alt="logo auto" />
                <p>$ 1.000.000</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  response: state.response,
});

const mapDispatchToProps = {
  mainInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Quote);
