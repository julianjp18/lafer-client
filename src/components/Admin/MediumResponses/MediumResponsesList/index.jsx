import React from "react";
import { Spin } from 'antd';

function MediumResponsesList({ mediumresponses }) {
  return mediumresponses ? (
    <div>
      {mediumresponses.map((mediumresponse) => (
        <p key={mediumresponse.mediumResponseID}>
          {`code: ${mediumresponse.mediumResponseID}, name: ${mediumresponse.response}`}
        </p>
      ))}    
    </div>
  ): (
    <div className="spin-container">
      <Spin tip="Cargando..." size="large"/>
    </div>
  );
}

export default MediumResponsesList;
