import React from "react";
import { Spin } from 'antd';

function TypeIdentificationsList({ typeidentifications }) {
  return typeidentifications ? (
    <div>
      {typeidentifications.map((typeidentification) => (
        <p key={typeidentification.typeIdentificationID}>
          {`code: ${typeidentification.typeIdentificationID}, name: ${typeidentification.identification}`}
        </p>
      ))}
    </div>
  ) : (
      <div className="spin-container">
        <Spin tip="Cargando..." size="large" />
      </div>
    );
}

export default TypeIdentificationsList;
