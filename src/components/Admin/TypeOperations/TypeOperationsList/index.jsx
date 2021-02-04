import React from "react";
import { Spin } from 'antd';

function TypeOperationsList({ typeoperations }) {
  return typeoperations ? (
    <div>
      {typeoperations.map((typeoperation) => (
        <p key={typeoperation.typeOperationID}>
          {`code: ${typeoperation.typeOperationID}, name: ${typeoperation.nameOperations}`}
        </p>
      ))}
    </div>
  ) : (
      <div className="spin-container">
        <Spin tip="Cargando..." size="large" />
      </div>
    );
}

export default TypeOperationsList;
