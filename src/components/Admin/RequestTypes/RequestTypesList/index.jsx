import React from "react";
import { Spin } from 'antd';

function RequestTypesList({ requesttypes }) {
  return requesttypes ? (
    <div>
      {requesttypes.map((requesttype) => (
        <p key={requesttype.requestTypeID}>
          {`code: ${requesttype.requestTypeID}, name: ${requesttype.requestName}`}
        </p>
      ))}
    </div>
  ) : (
      <div className="spin-container">
        <Spin tip="Cargando..." size="large" />
      </div>
    );
}

export default RequestTypesList;
