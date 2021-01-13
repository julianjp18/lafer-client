import React from "react";
import { Spin } from 'antd';

function CountriesList({ get_countries_list }) {
  return get_countries_list ? (
    <div style={{ padding: 50 }}>
      {get_countries_list.map((country) => (
        <p>
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
