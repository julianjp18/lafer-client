import React from "react";
import { Spin } from 'antd';

function CountriesList({ countries }) {
  return countries ? (
    <div>
      {countries.map((country) => (
        <p key={country.countryId}>
          {`code: ${country.countryId}, name: ${country.countryName}`}
        </p>
      ))}    
    </div>
  ): (
    <div className="spin-container">
      <Spin tip="Cargando..." size="large"/>
    </div>
  );
}

export default CountriesList;
