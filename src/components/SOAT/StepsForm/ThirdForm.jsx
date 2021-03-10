import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, Button, Card, Modal } from 'antd';
import moment from 'moment';

function ThirdForm({
  clientInfo,
  response
}) {
  const { selectedSoat } = clientInfo;

  const censorWord = function (str) {
    return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
  }


  useEffect(() => {
    if(response && response.error){
      showModal(Math.floor(Math.random() * (900000 - 500000)) + 1);
    }
  }, [])


  const [imagenCar, setImagenCar] = useState('/images/cars_logos/default_car.svg');

  // useEffect(() => {
  //   var http = new XMLHttpRequest();
  //   http.open("HEAD", `/images/cars_logos/${clientInfo.brand.toLowerCase()}.jpg`, false);
  //   http.send();
  //   if (http.status != 404) {
  //     setImagenCar(`/images/cars_logos/${clientInfo.brand.toLowerCase()}.jpg`);
  //   }
  // }, [])


  
  const showModal = (factura) => {
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
    inputBillNumber.value = factura;
    
    inputBillValue.type = 'hidden';
    inputBillValue.name = "valor";
    inputBillValue.id = "valor";
    inputBillValue.value = parseInt(clientInfo.selectedSoat.discount_total.replace("$ ", "").replace(".", ""));
    
    inputBillDescription.type = 'hidden';
    inputBillDescription.name = "descripcionFactura";
    inputBillDescription.id = "descripcionFactura";
    inputBillDescription.value = `Compra seguro para auto ${clientInfo.brand} ${clientInfo.line} (${clientInfo.placa})`;

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


  return (
<>
      <section className="paycard__container step-third">
        <h2>Resumen de compra</h2>
        <article>
          <img src={imagenCar} alt={`auto ${clientInfo.brand}`} />
          <ul className="info__container">
            <h4>Información del automovil</h4>
            <li>
              <h6>Placa</h6>
              <p>{clientInfo.placa}</p>
            </li>
            <li>
              <h6>Marca</h6>
              <p>{clientInfo.brand} {clientInfo.line}</p>
            </li>
            <li>
              <h6>Modelo</h6>
              <p>{clientInfo.model}</p>
            </li>
            <li>
              <h6>Cilindraje</h6>
              <p>falta</p>
            </li>
            <li>
              <h6>Nombre propietario</h6>
              <p>{censorWord(clientInfo.name)} {censorWord(clientInfo.lastName)}</p>
            </li>
          </ul>
        </article>
        <section className="soatinfo__container">
          <h2>{selectedSoat.producto}</h2>
          <article className="paycard__container--info">
            <section className="info__container">
              {selectedSoat.cotizacion_nro === 100 && (
                <>
                  {selectedSoat.imp_total && (
                    <p className="info__container--descuento">Costo: ${selectedSoat.imp_total.toLocaleString()}</p>
                  )}
                  <p>Bono: {selectedSoat.discount_text}</p>
                  <p><b>Costo: {selectedSoat.discount_total}</b></p>
                </>
              )}
              {selectedSoat.cotizacion_nro === 2 && (
                <>
                  <p>Bono: {selectedSoat.discount_text} millas</p>
                  <p><b>Costo: {selectedSoat.discount_total}</b></p>
                </>
              )}
            </section>
            <section className="logo__container">
              {selectedSoat.logo && selectedSoat.miles ? (
                <>
                  <img src={`/images/secures_logos/${selectedSoat.cod_aseguradora}.png`} alt="seguro" />
                  <img src={`/images/secures_logos/miles.png`} alt="seguro" className="img-smiles" />
                </>
              ) : (
                <img src={`/images/secures_logos/${selectedSoat.cod_aseguradora}.png`} alt="seguro" className="img-not-smiles"/>
              )}
            </section>
          </article>
        </section>
      </section>
      <Button type="primary" htmlType="submit" className="btn--next last-step">
        Proceder al pago
      </Button>
    </>
  );
}

export default ThirdForm;
