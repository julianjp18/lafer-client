import React from "react";
import { Row, Col } from 'antd';

const CarQuoteDescription = ({
  vehicle,
  brand,
  model,
  cylinderCapacity,
  name,
  isFirstForm = false,
}) => {
  const brandName = brand ? `${brand.split('-')[1]}.jpg` : 'default_car.svg';

  const brandLogo = () => {
    if (isFirstForm) return 'default_car.svg';
    return brandName;
  };

  const replaceName = () => {
    const nameArray = name.split('');
    let newName = nameArray[0]+nameArray[1];
    for (let index = 2; index < name.length; index++) {
      if (nameArray[index + 1] === ' ') newName += nameArray[index];
      else if (nameArray[index - 1] === ' ') newName += nameArray[index];
      else {
        if(nameArray[index] === ' ') newName += ' ';
        else newName += '*';
      }
    }
    newName += nameArray[nameArray.length-1];
    return newName;
  };

  return (
    <Row className="descrip-container">
      <Col xs={24}>
        <h2 className="descrip-title">Información automóvil</h2>
      </Col>
      <Col xs={10}>
        <div className="img-auto-container">
          <img className="img-auto" src={`/images/cars_logos/${brandLogo()}`} alt="logo auto" />
        </div>
      </Col>
      <Col xs={14}>
        <Row className="descrip-auto-container">
          <Col xs={12}>
            <p className="title-info">Placa</p>
            <p className="result-info">{vehicle}</p>
          </Col>
          <Col xs={12}>
            <p className="title-info">Marca</p>
            <p className="result-info">{brand ? brand : '-'}</p>
          </Col>
          <Col xs={12}>
            <p className="title-info">Modelo</p>
            <p className="result-info">{model ? model : '-'}</p>
          </Col>
          <Col xs={12}>
            <p className="title-info">Cilindraje</p>
            <p className="result-info">{cylinderCapacity}</p>
          </Col>
          <Col xs={24}>
            <p className="title-info">Nombre de propietario</p>
            <p className="result-info">{replaceName()}</p>
          </Col>
        </Row>
      </Col>
      <Col xs={24}>
        <p className="extra-info">
          Esta información se extrae directamente del RUNT, si hay algún error debes ponerte en contacto con ellos.
        </p>
      </Col>
    </Row>
  );
};

export default CarQuoteDescription;
