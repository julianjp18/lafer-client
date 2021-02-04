import React from "react";
import { Spin } from 'antd';

function InsurersList({ insurers }) {
  return insurers ? ( 
    <div>
      {insurers.map((insurer) => (
        <p key={insurer.id}>
          {`code: ${insurer.id}, name: ${insurer.insurerName}, contact: ${insurer.contact},  movil: ${insurer.movil}, logo: ${insurer.logo}, email: ${insurer.email}`}
          </p>
      ))}    
    </div>
  ): (
    <div className="spin-container">
      <Spin tip="Cargando..." size="large"/>
    </div>
  );
}

export default InsurersList;
