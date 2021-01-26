import React from "react";
import { Spin } from 'antd';

function PQRContactsList({ pqrcontacts }) {
  return pqrcontacts ? (
    <div>
      {pqrcontacts.map((pqrcontact) => (
        <p key={pqrcontact.pqrContactID}>
          {`code: ${pqrcontact.pqrContactID}, id: ${pqrcontact.identificaction}, name: ${pqrcontact.fullName},  email: ${pqrcontact.email}, movil: ${pqrcontact.movil}, comment: ${pqrcontact.comment}, annex: ${pqrcontact.fileAnnex}, date: ${pqrcontact.initialDate}`}
        </p>
      ))}    
    </div>
  ): (
    <div className="spin-container">
      <Spin tip="Cargando..." size="large"/>
    </div>
  );
}

export default PQRContactsList;
