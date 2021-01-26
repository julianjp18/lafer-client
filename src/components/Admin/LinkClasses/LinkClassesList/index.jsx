import React from "react";
import { Spin } from 'antd';

function LinkClassesList({ linkclasses }) {
  return linkclasses ? (
    <div>
      {linkclasses.map((linkclass) => (
        <p key={linkclass.linkClassID}>
          {`code: ${linkclass.linkClassID}, name: ${linkclass.nameLink}, othername: ${linkclass.other}`}
        </p>
      ))}    
    </div>
  ): (
    <div className="spin-container">
      <Spin tip="Cargando..." size="large"/>
    </div>
  );
}

export default LinkClassesList;
