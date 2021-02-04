import React from "react";
import { Spin } from 'antd';

function TypeCompaniesList({ typecompanies }) {
  return typecompanies ? (
    <div>
      {typecompanies.map((typecompanies) => (
        <p key={typecompanies.typeCompanyID}>
          {`code: ${typecompanies.typeCompanyID}, name: ${typecompanies.company}`}
        </p>
      ))}
    </div>
  ) : (
      <div className="spin-container">
        <Spin tip="Cargando..." size="large" />
      </div>
    );
}

export default TypeCompaniesList;
