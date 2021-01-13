import React from "react";
import { CheckOutlined } from '@ant-design/icons';
import { currencyFormat } from "../../../helpers";

const QuoteCoverage = ({ coberturasCotizacion }) => (
  coberturasCotizacion.map((coberturaCotizacion) => (
    <p key={coberturaCotizacion.valorPrima}>
      <CheckOutlined />
      {`${coberturaCotizacion.descripcion}: ${currencyFormat(coberturaCotizacion.valorPrima)}`} 
    </p>
  ))
);

export default QuoteCoverage;
