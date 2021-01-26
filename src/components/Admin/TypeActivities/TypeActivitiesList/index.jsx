import React from "react";
import { Spin } from 'antd';

function TypeActivitiesList({ typeactivities }) {
  return typeactivities ? (
    <div>
      {typeactivities.map((typeactivity) => (
        <p key={typeactivity.typeActivityID}>
          {`code: ${typeactivity.typeActivityID}, name: ${typeactivity.activity}`}
        </p>
      ))}    
    </div>
  ): (
    <div className="spin-container">
      <Spin tip="Cargando..." size="large"/>
    </div>
  );
}

export default TypeActivitiesList;
